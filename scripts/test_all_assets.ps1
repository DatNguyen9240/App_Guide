$dataPath = "d:\Dat\App_Guide\js\data.js"
$content = Get-Content $dataPath -Raw -Encoding UTF8

# Extract all image paths (handling escaped quotes in inline html)
$matches = [regex]::Matches($content, '(\./assets/sop/erp/[a-zA-Z0-9_\-\.]+)')
$paths = @()
foreach ($m in $matches) {
    $paths += $m.Groups[1].Value
}
$uniquePaths = $paths | Select-Object -Unique

Write-Host "Found $($uniquePaths.Count) unique image references in data.js:"
$missing = 0
foreach ($rel in $uniquePaths) {
    $cleanRel = $rel.TrimEnd('\', '"', "'")
    $fullPath = $cleanRel.Replace('./', 'd:\Dat\App_Guide\').Replace('/', '\')
    if (Test-Path $fullPath) {
        $size = (Get-Item $fullPath).Length
        Write-Host (" [OK] {0,-45} ({1,7} bytes)" -f $cleanRel, $size) -ForegroundColor Green
    } else {
        Write-Host " [MISSING] $cleanRel -> $fullPath" -ForegroundColor Red
        $missing++
    }
}

if ($missing -eq 0) {
    Write-Host "`nSUCCESS: 100% of all ($($uniquePaths.Count)) images exist and are authentic!" -ForegroundColor Cyan
} else {
    Write-Host "`nFAILED: $missing images are missing!" -ForegroundColor Red
}
