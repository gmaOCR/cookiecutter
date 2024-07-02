# Pre-requirements
Python 3.11

Pipenv (install via Pip or from repo depending on your distrib/OS)

npm

# Quick setup
git clone https://github.com/gmaOCR/cookiecutter.git

cd cookiecutter

"First terminal"
```
npm install
cd frontend
npm start
```

"Second terminal"
```
export PIPENV_VENV_IN_PROJECT=1
pipenv install
pipenv shell

python manage.py migrate
python manage.py runserver
```

The webservice is now avalaiable on http://127.0.0.1:8000/