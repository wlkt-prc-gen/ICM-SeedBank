# Packages this extension into a temporary .vsix and installs it into VS Code.
# The .vsix is a build output and is never committed.
$ErrorActionPreference = 'Stop'
$source = $PSScriptRoot
$outDir = Join-Path $env:TEMP 'copy-relative-path-slash'
New-Item -ItemType Directory -Force $outDir | Out-Null
$vsix = Join-Path $outDir 'copy-relative-path-slash.vsix'

Push-Location $source
try {
    npx --yes @vscode/vsce package --allow-missing-repository --skip-license --baseContentUrl https://github.com/wlkt-prc-gen/ICM-SeedBank/blob/main/Explorer_to_Chat --baseImagesUrl https://raw.githubusercontent.com/wlkt-prc-gen/ICM-SeedBank/main/Explorer_to_Chat --out $vsix
    if ($LASTEXITCODE -ne 0) { throw 'vsce package failed' }
} finally {
    Pop-Location
}

code --install-extension $vsix --force
if ($LASTEXITCODE -ne 0) { throw 'code --install-extension failed' }
Write-Output 'Installed. Run "Developer: Reload Window" in VS Code to activate it.'
