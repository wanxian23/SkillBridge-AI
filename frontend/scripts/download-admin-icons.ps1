# Downloads the admin icons exported from the Figma design into frontend/public/admin-icons.
#
# Run from the frontend folder:   .\scripts\download-admin-icons.ps1
#
# The Figma download links below are temporary (about 7 days). If a download fails,
# export the same layers by hand instead: in Figma select the layer, choose
# Export > SVG, and save it with the file name shown on the left.

$base = "https://www.figma.com/api/mcp/asset/28324d41-65f1-49bd-8b00-89467de5695d"
$target = Join-Path $PSScriptRoot "..\public\admin-icons"
New-Item -ItemType Directory -Force -Path $target | Out-Null

$files = @{
  "logo-mark.svg" = "eda29.svg"   # SkillBridge AI career fit mark
  "home.svg"      = "e6c2f.svg"   # Icon / home
  "user.svg"      = "46bb4.svg"   # Icon / user
  "job.svg"       = "c18bb.svg"   # Icon / job
  "map.svg"       = "d63c7.svg"   # Icon / map
  "arrow.svg"     = "508dc.svg"   # Icon / arrow
}

foreach ($name in $files.Keys) {
  $url = "$base/$($files[$name])"
  $out = Join-Path $target $name
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -ErrorAction Stop
    Write-Host "Saved $name"
  } catch {
    Write-Warning "Could not download $name. Export it from Figma manually."
  }
}
