release: python manage.py makemigrations iscore_app
release: python manage.py migrate
channelsworker:python manage.py runworker 
web: daphne iscore.asgi:application
