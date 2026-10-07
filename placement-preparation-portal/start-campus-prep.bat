@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==============================================
echo        CampusPrep - Placement Portal
echo ==============================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
    echo Node.js and npm were not found.
    echo Install Node.js from https://nodejs.org/ and run this file again.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing project dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo npm install failed. Check your internet connection and try again.
        pause
        exit /b 1
    )
)

echo.
echo Starting CampusPrep...
echo Keep this window open while using the application.
echo.
call npm run dev

pause
