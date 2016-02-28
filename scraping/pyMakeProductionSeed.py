import sys
import glob
import random
import codecs
import sqlite3
import time
from codecs import open
from xml.dom import minidom

dbname = "dev2.sqlite3"

initial = """Toilet.destroy_all
"""
initialNum = 0

allowed = ['toilets','cafe','restaurant','pub','station','mall','fast_food','parking']

patternToi = "toi%d = Toilet.create(lat: '%s', lon:'%s', disabledfriendly: %d, momfriendly: %d, prize: '%d', name: '%s', adress: '%s', desc:'%s',toilettype: '%s')"
patternToiDB = "INSERT INTO TOILETS (lat, lon, disabledfriendly, momfriendly, \
	prize, created_at, updated_at, name, adress, desc, toilettype) \
      VALUES (%f, %f, %s, %s, %f, '%s', '%s', '%s', '%s', '%s', '%s');"


types =[
('toaleta','Toaleta'),
('cafe','Kawiarnia'),
('restauracja','Restauracja'),
('mcdonalds','McDonalds'),
('CH','Centrum Handlowe'),
('PR','Parkuj i Jedz'),
('metro','Stacje Metra')
]

forbidden = ['bus_stop', 'bicycle_rental', 'tram_stop', 'information', 'yes', 'bicycle_parking']

schema = """CREATE TABLE "toilets" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "lat" float, "lon" float, "disabledfriendly" boolean, "momfriendly" boolean, "prize" float, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "name" varchar, "adress" text, "desc" text, "toilettype" varchar);"""


def toBoolean(num):
	if num == 0:
		return 'true'
	else:
		return 'false'

def extractData(fname, nn, opis, f):
	#print fname
	DOMTree = minidom.parse(fname) # AZ : wczytanie pliku
	collection = DOMTree.documentElement

	places = collection.getElementsByTagName("place")
	for p in places:
		if p.hasAttribute("lat") and p.hasAttribute("lon"):
			lat = p.getAttribute("lat")
			lon = p.getAttribute("lon")
			name = opis
			addr = p.getAttribute("display_name")
			desc = ''
			ttype = p.getAttribute("type")
			
			if ttype in allowed:
				if ttype == 'parking' and not addr.startswith('P+R'): 
					# tylko na park and ride jest toaleta
					continue

				#dataInsert = patternToi % (1, lat, lon, random.randint(0,1), random.randint(0,1), random.randint(0,2),name,addr.replace("'",''),desc,ttype)
				
				disabledfriendly = random.randint(0,1)
				momfriendly = random.randint(0,1)
				prize = float(random.randint(0,2))

				if ttype == 'mall':
					prize = 0.0
					momfriendly = 1
					disabledfriendly = 1

				if ttype == 'station':
					prize = 2.0
					disabledfriendly = 1

				if ttype == 'parking':
					momfriendly = 0
					prize = 0.0

				#if ttype == 'cafe':
				#	momfriendly = 1

				if ttype == 'fast_food':
					momfriendly = 1
					disabledfriendly = 1
				
				created_at = str(time.strftime("%Y-%m-%d %H:%M:%S.0"))
				updated_at = str(time.strftime("%Y-%m-%d %H:%M:%S.0"))

				#latf = float(lat)
				#lonf = float(lon)

				dataInsert = patternToi % (nn, lat, lon, disabledfriendly, momfriendly, prize, name, addr.replace("'",''), desc, ttype)
				
				print dataInsert
				
				nn = nn + 1
	return nn


if __name__ == "__main__":
	with open('seeds.rb', 'w','utf-8') as f:
		f.write(initial+'\n')
		nn = initialNum

		for tt in types:
			(mm,opis) = tt
			pattern = "%s_*.xml" % (mm)
			flist = glob.glob(pattern)			
		
			for ff in flist:
				nn = extractData(ff, nn, opis, f)
