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

echo Starting portfolio network preview:
echo Local:   http://127.0.0.1:3003/
echo Network: use your computer IPv4 address, for example http://YOUR-IP:3003/
echo.
call npm.cmd run start -- -H 0.0.0.0 -p 3003

echo.
echo Network preview server stopped or failed to start. Press any key to close.
pause >nul
