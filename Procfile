release: python manage.py makemigrations iscore_app
release: python manage.py migrate
channelsworker: daphne myproject.asgi:application
web: gunicorn iscore.wsgi
