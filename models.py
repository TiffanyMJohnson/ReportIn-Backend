import os
from peewee import *
import datetime

from flask_login import UserMixin

from playhouse.db_url import connect

if 'ON_HEROKU' in os.environ:
    DATABASE = connect(os.environ.get('DATABASE_URL'))

else:
  DATABASE = SqliteDatabase('memos.sqlite')


class User(UserMixin, Model):
    username = CharField(unique=True)
    email = CharField(unique=True)
    password = CharField()
    role = CharField()
    admin = BooleanField(default=False)

    class Meta:
        database = DATABASE

class Memo(Model):
    title = CharField()
    date = DateTimeField(default=datetime.datetime.now)
    body = TextField()



def initialize():
    DATABASE.connect()
    DATABASE.create_tables([Memo], safe=True)
    print("TABLES Created")
    DATABASE.close()