release: python manage.py makemigrations iscore_app
release: python manage.py migrate
web: gunicorn iscore.wsgi
channelsworker: daphne iscore.asgi:application
