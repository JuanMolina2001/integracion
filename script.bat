@echo off
REM 
start cmd /k "npm start"

REM 
ping -n 5 127.0.0.1 > nul

REM 
ngrok.exe config add-authtoken 2XmkO92mhoqFOM0sJd1xcgG3rLD_nEW3JRnW8Sg2wPyZqhCs
start cmd /k "ngrok.exe http 3000"

REM 
ping -n 5 127.0.0.1 > nul

REM 
start chrome http://localhost:4040