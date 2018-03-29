
echo starting webpack 
start "npm" start-web-pack-env.bat

echo starting django
start "django" python manage.py runserver
 
echo waiting ...
ping 1.2.3.4 -w 3000 -n 1 >NUL

echo opening iscore page

start "opening iscore" "http://127.0.0.1:8000/iscore_app/index/"

echo all is running
ping 1.2.3.4 -w 1000
pause
