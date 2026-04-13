@echo off
echo === AI Brief Generator ===
echo.

cd /d "%~dp0.agents\ai-brief"
if %errorlevel% neq 0 (
    echo Failed to enter agent directory!
    pause
    exit /b 1
)

echo Running agent...
echo.
powershell -NoProfile -Command "claude -p ([System.IO.File]::ReadAllText('scripts\run-daily-brief.md')) --dangerously-skip-permissions"

if %errorlevel% neq 0 (
    echo.
    echo Brief generation failed!
    pause
    exit /b 1
)

echo.
echo Done! Check source\_posts\ai-brief\
pause
