$rawDir = "d:\Dat\App_Guide\assets\sop\erp\docx_raw"
$files = Get-ChildItem -Path $rawDir -Filter "*.png" | Sort-Object { [int]($_.BaseName -replace '\D') }

$hashes = @{}
foreach ($f in $files) {
    $h = (Get-FileHash -Path $f.FullName -Algorithm SHA256).Hash
    if (-not $hashes.ContainsKey($h)) {
        $hashes[$h] = @()
    }
    $hashes[$h] += $f.Name
}

Write-Host "=== 1. DUPLICATE BINARY FILES IN DOCX_RAW ==="
$hasDup = $false
foreach ($h in $hashes.Keys) {
    if ($hashes[$h].Count -gt 1) {
        $hasDup = $true
        Write-Host "Duplicate images with same hash: $($hashes[$h] -join ', ')"
    }
}
if (-not $hasDup) {
    Write-Host "All 23 images in docx_raw are physically distinct files (no identical checksums)."
}

Write-Host "`n=== 2. IMAGES REPEATED IN THE ORIGINAL DOCX TABLE ==="
# Read the document xml to see where each rId/image is used
[xml]$doc = Get-Content 'd:\Dat\App_Guide\scripts\raw_document_xml.xml'
[xml]$rels = Get-Content 'd:\Dat\App_Guide\scripts\raw_rels.xml'

$ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$ns.AddNamespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
$ns.AddNamespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
$ns.AddNamespace('v', 'urn:schemas-microsoft-com:vml')

$relMap = @{}
foreach ($rel in $rels.Relationships.Relationship) {
    if ($rel.Target -like '*media/*') {
        $relMap[$rel.Id] = [System.IO.Path]::GetFileName($rel.Target)
    }
}

# Find all occurrences of each image across all paragraphs in docx
$imgOccurrences = @{}
$bodyChildren = $doc.SelectNodes('//w:p', $ns)
$pIndex = 0
foreach ($p in $bodyChildren) {
    $pIndex++
    $txt = ($p.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join ''
    $txt = [regex]::Replace($txt, '\s+', ' ').Trim()

    $blips = $p.SelectNodes('.//a:blip', $ns)
    foreach ($b in $blips) {
        $eId = $b.GetAttribute('embed', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
        if ($relMap.ContainsKey($eId)) {
            $img = $relMap[$eId]
            if (-not $imgOccurrences.ContainsKey($img)) { $imgOccurrences[$img] = @() }
            $subTxt = if ($txt.Length -gt 30) { $txt.Substring(0,30) + '...' } else { $txt }
            $imgOccurrences[$img] += ("P" + $pIndex + ": " + $subTxt)
        }
    }
}

foreach ($img in ($imgOccurrences.Keys | Sort-Object { [int]($_ -replace '\D') })) {
    $count = $imgOccurrences[$img].Count
    if ($count -gt 1) {
        Write-Host "Image $img is used $count times in docx:" -ForegroundColor Yellow
        foreach ($occ in $imgOccurrences[$img]) {
            Write-Host "  -> $occ"
        }
    } else {
        Write-Host "Image $img is used 1 time"
    }
}

Write-Host "`n=== 3. DUPLICATE IMAGES REFERENCED IN JS/DATA.JS ==="
$dataPath = "d:\Dat\App_Guide\js\data.js"
$jsContent = Get-Content $dataPath -Raw -Encoding UTF8

# Look at each step in guidesData
$guideBlocks = [regex]::Matches($jsContent, '(?ms)id:\s*"([^"]+)",.*?steps:\s*\[(.*?)\]\s*\}')
foreach ($gb in $guideBlocks) {
    $guideId = $gb.Groups[1].Value
    $stepsStr = $gb.Groups[2].Value
    $stepBlocks = [regex]::Matches($stepsStr, '(?ms)\{\s*stepNumber:\s*(\d+),.*?name:\s*\{\s*vi:\s*"([^"]+)"(.*?)\}')
    foreach ($sb in $stepBlocks) {
        $stepNum = $sb.Groups[1].Value
        $stepName = $sb.Groups[2].Value
        $stepBody = $sb.Groups[3].Value
        
        $imgMatches = [regex]::Matches($stepBody, '(\./assets/sop/erp/[a-zA-Z0-9_\-\.]+)')
        $imgList = @()
        foreach ($im in $imgMatches) {
            $imgList += $im.Groups[1].Value.TrimEnd('\', '"', "'")
        }
        
        # Check if any image is repeated within this same step
        $groups = $imgList | Group-Object | Where-Object { $_.Count -gt 1 }
        if ($groups.Count -gt 0) {
            Write-Host "In guide [$guideId] -> Step $stepNum ($stepName): repeated images within same step:" -ForegroundColor Magenta
            foreach ($g in $groups) {
                Write-Host "  -> $($g.Name) is referenced $($g.Count) times"
            }
        }
    }
}

Write-Host "`n=== 4. DUPLICATE FILES IN ASSETS/SOP/ERP DIRECTORY ==="
$erpFiles = Get-ChildItem -Path "d:\Dat\App_Guide\assets\sop\erp" -File
$erpHashes = @{}
foreach ($f in $erpFiles) {
    $h = (Get-FileHash -Path $f.FullName -Algorithm SHA256).Hash
    if (-not $erpHashes.ContainsKey($h)) { $erpHashes[$h] = @() }
    $erpHashes[$h] += $f.Name
}
foreach ($h in $erpHashes.Keys) {
    if ($erpHashes[$h].Count -gt 1) {
        Write-Host "Identical content in assets/sop/erp: $($erpHashes[$h] -join ' == ')" -ForegroundColor Cyan
    }
}
