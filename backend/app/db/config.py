import pymongo
import os

mongo_client = pymongo.MongoClient(os.environ.get("MONGO_URI", "mongodb://localhost:27017/"))

timetable_db = mongo_client["timetable"]
subject_collection = timetable_db.subjects
user_collection = timetable_db.users
