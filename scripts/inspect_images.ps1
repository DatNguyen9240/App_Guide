Add-Type -AssemblyName System.Drawing
for ($i=1; $i -le 23; $i++) {
    $p = "d:\Dat\App_Guide\assets\sop\erp\docx_raw\image$i.png"
    if (Test-Path $p) {
        $img = [System.Drawing.Image]::FromFile($p)
        Write-Host ("image{0,2}.png: Width={1,4}, Height={2,4}, Size={3,7} bytes" -f $i, $img.Width, $img.Height, (Get-Item $p).Length)
        $img.Dispose()
    }
}
