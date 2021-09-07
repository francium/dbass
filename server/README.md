# Server

This is the backend server written in Python and using Flask as a minimal web
framework.

Right now it's hard coded to just using a `countries.db` SQLite database.


## Quick Start


### if `poetry` is installed
```
# Install dependencies
poetry install

# Run application
FLASK_APP=dchanel_server:app_factory FLASK_DEBUG=1 poetry run flask run
```


### if `virtualenv` is installed (I haven't verified these instructions, just off the top of my head)
```
# Create virtual environment
virtualenv venv
source venv/bin/activate

# Install dependencies
pip install flask

# Run application
FLASK_APP=dchanel_server:app_factory FLASK_DEBUG=1 flask run
```
