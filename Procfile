release: python manage.py makemigrations iscore_app
release: python manage.py migrate
web: npm run webpack
web: gunicorn iscore.wsgi