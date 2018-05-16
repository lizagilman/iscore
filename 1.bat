@echo off
:start
echo  alisa :*
ping 100.100.0.0 -n 1 -w 1000>NUL
goto start
