$docXml = [System.IO.File]::ReadAllText('d:\Dat\App_Guide\scripts\raw_document_xml.xml', [System.Text.Encoding]::UTF8)
$relsXml = [System.IO.File]::ReadAllText('d:\Dat\App_Guide\scripts\raw_rels.xml', [System.Text.Encoding]::UTF8)

$doc = New-Object System.Xml.XmlDocument
$doc.LoadXml($docXml)

$rels = New-Object System.Xml.XmlDocument
$rels.LoadXml($relsXml)

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

$sb = New-Object System.Text.StringBuilder

$tables = $doc.SelectNodes('//w:tbl', $ns)
[void]$sb.AppendLine("Found $($tables.Count) tables")

for ($t = 0; $t -lt $tables.Count; $t++) {
    [void]$sb.AppendLine("`n=== TABLE $($t+1) ===")
    $rows = $tables[$t].SelectNodes('.//w:tr', $ns)
    for ($r = 0; $r -lt $rows.Count; $r++) {
        $cells = $rows[$r].SelectNodes('./w:tc', $ns)
        $cellTexts = @()
        for ($c = 0; $c -lt $cells.Count; $c++) {
            $pList = $cells[$c].SelectNodes('.//w:p', $ns)
            $pTexts = @()
            foreach ($p in $pList) {
                $pt = ($p.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join ''
                $pt = [regex]::Replace($pt, '\s+', ' ').Trim()
                
                $imgs = @()
                $blips = $p.SelectNodes('.//a:blip', $ns)
                foreach ($b in $blips) {
                    $eId = $b.GetAttribute('embed', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
                    if ($relMap.ContainsKey($eId)) { $imgs += $relMap[$eId] }
                }
                $vmlImgs = $p.SelectNodes('.//v:imagedata', $ns)
                foreach ($vi in $vmlImgs) {
                    $eId = $vi.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
                    if ($relMap.ContainsKey($eId)) { $imgs += $relMap[$eId] }
                }
                $imgStr = if ($imgs.Count -gt 0) { " (IMG: " + ($imgs -join ', ') + ")" } else { "" }
                if ($pt.Length -gt 0 -or $imgStr.Length -gt 0) {
                    $pTexts += ($pt + $imgStr)
                }
            }
            $cellTexts += ("[C$($c+1)]: " + ($pTexts -join " // "))
        }
        [void]$sb.AppendLine("R$($r+1): " + ($cellTexts -join " | "))
    }
}

[System.IO.File]::WriteAllText('d:\Dat\App_Guide\scripts\full_docx_parsed.txt', $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Parsed successfully to scripts/full_docx_parsed.txt"
