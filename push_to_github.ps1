# ===================================================================
# 🌾 RythuMitra — Push to GitHub Helper Script
# Repository: https://github.com/Nani0705/RythuMitra
# ===================================================================

$env:Path = "C:\Users\S Anil\.gemini\antigravity-ide\tools\mingit\cmd;" + $env:Path

Write-Host "🌾 Pushing RythuMitra to https://github.com/Nani0705/RythuMitra..." -ForegroundColor Green

if ($env:GITHUB_TOKEN) {
    Write-Host "Using GITHUB_TOKEN environment variable..." -ForegroundColor Cyan
    git push "https://$($env:GITHUB_TOKEN)@github.com/Nani0705/RythuMitra.git" main
} else {
    Write-Host ""
    Write-Host "👉 When prompted by Git:" -ForegroundColor Yellow
    Write-Host "   Username: Nani0705" -ForegroundColor Yellow
    Write-Host "   Password: <Your GitHub Personal Access Token (PAT)>" -ForegroundColor Yellow
    Write-Host ""
    git push -u origin main
}
