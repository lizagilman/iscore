release: python manage.py makemigrations iscore_app
release: python manage.py migrate
channelsworker: bin/start-pgbouncer-stunnel gunicorn iscore.wsgi
web: daphne iscore.asgi:application --port $PORT --bind 0.0.0.0 -v2 
