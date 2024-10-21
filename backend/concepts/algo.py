from app.utils.api_timetable_utils import create_timetable, store_timetable

user_id = "668f5e36fea09a575df5e494"

tt = create_timetable(user_id)

print(tt)

