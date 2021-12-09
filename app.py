from flask inport Flask, jsonify, after_this_request

from resources.dogs import memos
from resources.users import users

import models

from flask_cors import CORS

from flask_login import LoginManager

import os

from dotenv import load_dotenv

load_dotenv()

DEBUG = True
PORT = 8000


app = Flask(__name__)

app.secret_key = os.environ.get("FLASK_APP_SECRET")
print(os.environ.get("FLASK_APP_SECRET"))

login_manager = LoginManager()

login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    try:
        print("loading the following user")
        user = models.User.get_by_id(user_id) 

        return user
    except models.DoesNotExist:
        return None

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify(
        data={
            'error': 'User not logged in'
        },
        message="You must be logged in to access that resource",
        status=401
    ), 401


CORS(memos, origins=['http://localhost:3000'], supports_credentials=True)
CORS(users, origins=['http://localhost:3000'], supports_credentials=True)

app.register_blueprint(memos, url_prefix='/api/v1/memos')
app.register_blueprint(users, url_prefix='/api/v1/users')

@app.before_request 
def before_request():

    """Connect to the db before each request"""
    print("you should see this before each request") 
    models.DATABASE.connect()

    @after_this_request 
    def after_request(response):
        """Close the db connetion after each request"""
        print("you should see this after each request") 
        models.DATABASE.close()
        return response

# start routes here #
@app.route('/Gunslingers_Drill_Team')
def index():
    return 'Welcome to the Gunslingers Drill Team website'






# end routes here #

if os.environ.get('FLASK_ENV') != 'development':
  print('\non heroku!')
  models.initialize()

if __name__ == '__main__':
    
    models.initialize() 
    app.run(debug=DEBUG, port=PORT)