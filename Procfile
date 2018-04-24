release: python manage.py makemigrations iscore_app
release: python manage.py migrate
npm run webpack
web: gunicorn iscore.wsgi