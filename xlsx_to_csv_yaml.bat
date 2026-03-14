@echo off
@REM set NODE_PATH=%USERPROFILE%\AppData\Roaming\npm\node_modules
@REM 
@REM "C:\Program Files\nodejs\node"  build/xlsx_to_csv_yaml.js

set NODE_PATH=%cd%\node_modules

"C:\nvm4w\nodejs\node.exe"  build/src/xlsx_to_csv_yaml.js

pause
