# deploy.ps1
# ALWAYS deploys via Vercel CLI directly. Git push is for record-keeping only.
# Usage: .\deploy.ps1 "your commit message"

param(
    [string]$Message = "chore: update"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path $MyInvocation.MyCommand.Path
$VaultPath = "C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"

# Load token from vault
$vault = Get-Content $VaultPath -Raw | ConvertFrom-Json
$env:VERCEL_TOKEN = $vault._vault.VERCEL_TOKEN

Write-Host "Staging and committing..." -ForegroundColor Cyan
git -C $ProjectRoot add -A
git -C $ProjectRoot commit -m $Message

Write-Host "Pushing to git (record only)..." -ForegroundColor Gray
git -C $ProjectRoot push origin main 2>$null

Write-Host "Deploying to production via Vercel CLI..." -ForegroundColor Cyan
npx vercel --prod --yes --token $env:VERCEL_TOKEN

Write-Host "Done." -ForegroundColor Green
