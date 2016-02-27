import sys
import glob
import random
import codecs
from xml.dom import minidom

initial = """Toilet.destroy_all
"""
initialNum = 1

patternToi = "toi%d = Toilet.create(lat: '%s', lon:'%s', disabledfriendly: %d, momfriendly: %d, prize: '%d', name: '%s', adress: '%s', desc:'%s',type: '%s')"

types =[
('toaleta','Toaleta'),
('cafe','Kawiarnia'),
('restauracja','Restauracja'),
('mcdonalds','McDonalds'),
('CH','Centrum Handlowe'),
('PR','Parkuj i Jedz'),
('metro','Stacje Metra')
]

def extractData(fname, nn, opis):
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
			dataInsert = patternToi % (nn, lat, lon, random.randint(0,1), random.randint(0,1), random.randint(0,2),name,'',desc,ttype)
			print dataInsert
	return nn


if __name__ == "__main__":
	print initial
	nn = initialNum

	for tt in types:
		(mm,opis) = tt
		pattern = "%s_*.xml" % (mm)
		flist = glob.glob(pattern)			
		
		for ff in flist:
			nn = extractData(ff, nn, opis)