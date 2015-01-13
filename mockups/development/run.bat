@echo off

:check_node
where /q node || goto :node_missing

"%~dp0node.exe" "%~dp0server.js"
goto :eof

:node_missing
echo Install nodejs from http://nodejs.org
pause
