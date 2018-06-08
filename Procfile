release: python manage.py makemigrations iscore_app
release: python manage.py migrate
channelsworker: python manage.py runserver
web: daphne iscore.asgi:application --port $PORT --bind 0.0.0.0 -v2 
