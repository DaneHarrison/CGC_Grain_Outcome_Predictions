from DataService import DataService
import sqlalchemy as sq
import json

TABLE_NAME = 'agg_weather_combined'

db = DataService()
conn = db.connect()

columnQuery = sq.text(
    f"""
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = '{TABLE_NAME}';
    """
)

results = db.execute(columnQuery)
results = results.all()

attrs = []


for result in results:
    dict = {"name": result[0], "displayName": result[0], "selected": False, "loaded": False}
    attrs.append(dict)

out_file = open("output.json", "w")   
json.dump(attrs, out_file, indent = 4) 
out_file.close() 