param(
  [string]$Message = "Deploy static portfolio build",
  [string]$Proxy = "http://127.0.0.1:7897",
  [switch]$NoProxy
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$outDir = Join-Path $root "out"
$deployDir = Join-Path $root ".deploy-static"

function Invoke-Step {
  param(
    [string]$Name,
    [scriptblock]$Script
  )

  Write-Host ""
  Write-Host "==> $Name" -ForegroundColor Cyan
  & $Script
}

function Invoke-Git {
  param([string[]]$GitCommand)

  $gitArgs = @("-c", "safe.directory=F:/po/.deploy-static")
  if (-not $NoProxy -and $Proxy) {
    $gitArgs += @("-c", "http.proxy=$Proxy", "-c", "https.proxy=$Proxy")
  }
  $gitArgs += $GitCommand

  & git @gitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitCommand -join ' ') failed with exit code $LASTEXITCODE"
  }
}

Invoke-Step "Build static site" {
  Push-Location $root
  try {
    & npm run build:cloudflare
    if ($LASTEXITCODE -ne 0) {
      throw "npm run build:cloudflare failed with exit code $LASTEXITCODE"
    }
  } finally {
    Pop-Location
  }
}

Invoke-Step "Sync out to deploy worktree" {
  if (-not (Test-Path -LiteralPath $outDir)) {
    throw "Missing static output: $outDir"
  }
  if (-not (Test-Path -LiteralPath $deployDir)) {
    throw "Missing deploy worktree: $deployDir"
  }

  $resolvedOut = (Resolve-Path -LiteralPath $outDir).Path
  $resolvedDeploy = (Resolve-Path -LiteralPath $deployDir).Path
  if (-not $resolvedOut.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Unexpected output path: $resolvedOut"
  }
  if (-not $resolvedDeploy.StartsWith((Join-Path $root ".deploy-static"), [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Unexpected deploy path: $resolvedDeploy"
  }

  & robocopy $resolvedOut $resolvedDeploy /MIR /XD .git /XF .git /NFL /NDL /NJH /NJS /NP
  if ($LASTEXITCODE -gt 7) {
    throw "robocopy failed with exit code $LASTEXITCODE"
  }
}

Invoke-Step "Commit deploy branch" {
  Push-Location $deployDir
  try {
    Invoke-Git -GitCommand @("add", "-A")
    $status = (& git -c safe.directory=F:/po/.deploy-static status --porcelain)
    if (-not $status) {
      Write-Host "No deploy changes to commit."
      return
    }
    Invoke-Git -GitCommand @("commit", "-m", $Message)
  } finally {
    Pop-Location
  }
}

Invoke-Step "Push deploy branch" {
  Push-Location $deployDir
  try {
    Invoke-Git -GitCommand @("push", "origin", "deploy")
  } finally {
    Pop-Location
  }
}

Write-Host ""
Write-Host "Deploy branch pushed. Cloudflare Pages should pick up the new build." -ForegroundColor Green
