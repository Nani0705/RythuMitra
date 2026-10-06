@echo off
title RythuMitra Web Server
echo ======================================================
echo    RythuMitra - Smart Digital Farming Platform
echo    Starting local development server...
echo ======================================================

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js found. Starting server via Node.js...
    node server.js
    goto end
)

where py >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python found. Starting server via Python on port 3000...
    start http://localhost:3000
    py -m http.server 3000
    goto end
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python found. Starting server via Python on port 3000...
    start http://localhost:3000
    python -m http.server 3000
    goto end
)

echo [INFO] Opening index.html directly in your default browser...
start index.html

:end
pause
