@echo off

:check_npm
where /q npm || goto :npm_missing
:: This fixes a bug in recent versions of nodejs installer
set NPM=%appdata%\npm
if not exist "%NPM%" mkdir "%NPM%"

goto :check_git

:npm_missing
echo Install nodejs from http://nodejs.org

:check_git
where /q git || goto :git_missing
goto :run

:git_missing
echo Install git from http://www.git-scm.com/download/win
echo Make sure to install git such that it is available from cmd prompts.
pause
goto :eof

:run

set GULP=%~dp0node_modules\.bin\gulp

if not exist "%GULP%" npm install
if exist "%GULP%" cmd /k "%GULP%"
