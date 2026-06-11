@echo off
cd /d "%~dp0"

if not exist ".next\BUILD_ID" (
  echo No production build found. Building first...
  call npm.cmd run build
  if errorlevel 1 (
    echo.
    echo Build failed. Press any key to close.
    pause >nul
    exit /b 1
  )
)

echo Starting portfolio preview:
echo http://127.0.0.1:3003/
echo.
call npm.cmd run start -- -H 127.0.0.1 -p 3003

echo.
echo Preview server stopped or failed to start. Press any key to close.
pause >nul
