# Creates a clean ZIP for Chrome Web Store upload.
# Usage: .\package-extension.ps1

$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$manifest = Get-Content (Join-Path $root "manifest.json") -Raw | ConvertFrom-Json
$version = $manifest.version
$name = "fg-enhancer"
$dist = Join-Path $root "dist"
$output = Join-Path $dist "$name-v$version.zip"

New-Item -ItemType Directory -Force -Path $dist | Out-Null
if (Test-Path $output) { Remove-Item $output -Force }

$include = @(
  "manifest.json",
  "background.js",
  "icons",
  "popup",
  "content"
)

$stage = Join-Path $dist "stage"
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null

foreach ($item in $include) {
  $src = Join-Path $root $item
  if (-not (Test-Path $src)) {
    throw "Missing required path: $item"
  }
  $dest = Join-Path $stage $item
  if (Test-Path $src -PathType Container) {
    Copy-Item $src $dest -Recurse
  } else {
    Copy-Item $src $dest
  }
}

Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $output -Force
Remove-Item $stage -Recurse -Force

$sizeKb = [math]::Round((Get-Item $output).Length / 1KB, 1)
Write-Host "Packaged: $output ($sizeKb KB)"
Write-Host "Upload this ZIP at https://chrome.google.com/webstore/devconsole"
