import sys
import glob
import random
import codecs
from codecs import open
from xml.dom import minidom

initial = """Toilet.destroy_all
"""
initialNum = 1

patternToi = "toi%d = Toilet.create(lat: '%s', lon:'%s', disabledfriendly: %d, momfriendly: %d, prize: '%d', name: '%s', adress: '%s', desc:'%s',toilettype: '%s')"

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
			nn = nn + 1
			if ttype not in forbidden:
				dataInsert = patternToi % (nn, lat, lon, random.randint(0,1), random.randint(0,1), random.randint(0,2),name,addr.replace("'",''),desc,ttype)
				f.write(dataInsert+"\n")
			#print dataInsert
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
