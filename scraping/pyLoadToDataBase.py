import sys
from xml.dom import minidom

initial = """Toilet.destroy_all
toi1 = Toilet.create(lat: '52.2169803', lon:'20.9952883', disabledfriendly: 0, momfriendly: 0, prize: 0  )
toi2 = Toilet.create(lat: '52.2463708', lon:'21.0194412', disabledfriendly: 0, momfriendly: 0, prize: 0  )"""

def extractData(fname):
	print fname

if __name__ == "__main__":
	#print initial
	fnamePattern = "data_%d.xml"
	for i in range(9):
		fname = fnamePattern % (i)
		extractData(fname)