import sys
from xml.dom import minidom

initial = """Toilet.destroy_all
toi1 = Toilet.create(lat: '52.2169803', lon:'20.9952883', disabledfriendly: 0, momfriendly: 0, prize: 0  )
toi2 = Toilet.create(lat: '52.2463708', lon:'21.0194412', disabledfriendly: 0, momfriendly: 0, prize: 0  )"""
initialNum = 3

patternToi = "toi%d = Toilet.create(lat: '%s', lon:'%s', disabledfriendly: 0, momfriendly: 0, prize: 0  )"

def extractData(fname, nn):
	#print fname
	DOMTree = minidom.parse(fname) # AZ : wczytanie pliku
	collection = DOMTree.documentElement

	places = collection.getElementsByTagName("place")
	for p in places:
		if p.hasAttribute("lat") and p.hasAttribute("lon"):
			lat = p.getAttribute("lat")
			lon = p.getAttribute("lon")
			nn = nn + 1
			dataInsert = patternToi % (nn, lat, lon)
			print dataInsert
	return nn


if __name__ == "__main__":
	print initial
	fnamePattern = "data_%d.xml"
	nn = initialNum
	for i in range(9):
		fname = fnamePattern % (i)
		nn = extractData(fname, nn)