import tcxparser
import os
import pyotherside
import json
import requests
import hashlib

class Activity:

	def __init__(self,file):
		fitpath = file
		tcxpath = os.getcwd() + "/out.tcx"
		os.system("python2 src/python/fittotcx.py " + fitpath + " > out.tcx")
		self.tcx = tcxparser.TCXParser(tcxpath)

	@property
	def distance(self):
		return str(round(self.tcx.distancetest / 1000,2))
	@property
	def duration(self):
		return str(round(self.tcx.duration / 3600,2))
	@property
	def hr_values(self):
		return self.tcx.hr_values
	@property
	def elevation_values(self):
		return self.tcx.elevation_values
	@property
	def time_values(self):
		return self.tcx.time_values
	@property
	def latitude(self):
		return str(self.tcx.latitude)
	@property
	def longitude(self):
		return str(self.tcx.longitude)
	@property
	def distance_values(self):
		return self.tcx.distance_values

def getActivityData(file):
	print(file)
	activity = Activity(file)
	print(activity.time_values)
	return activity.distance + ";" + activity.duration + ";" + ",".join(activity.hr_values) + ";" + ",".join(activity.distance_values) + ";" + activity.latitude + ";" + activity.longitude + ";" + ",".join(activity.elevation_values)

def md5hash(str):
	return hashlib.md5(str.encode('utf-8')).hexdigest()

def addWorkout(user, passhash, title, description, duration, distance, crten, sport, distancevalues, hrvalues, elevvalues):
    if sport == "mtb":
        ismtb = True
        isroad = False
        isother = False
    elif sport == "road":
        ismtb = False
        isroad = True
        isother = False
    else:
        ismtb = False
        isroad = False
        isother = True
    url = "http://localhost:3000/api/new_workout"
    data = {"title" : title,"passhash" : passhash, "description" : description, "length" : duration, "distance" : distance, "mtb" : ismtb,"crten" : crten, "user" : user,"hrvalues" : hrvalues,"distancevalues" : distancevalues, "elevvalues" : elevvalues}
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    return r.text
