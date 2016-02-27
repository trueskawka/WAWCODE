import urllib2
from xml.dom import minidom

url = "http://nominatim.openstreetmap.org/search.php?q=toaleta+publiczna%2C+warszawa&polygon=1&format=xml"

"""Od 2007 mozna w kazdej kawiarni wejsc do toalety"""

def get_next_url(contents):
    DOMTree = minidom.parseString(contents)
    collection = DOMTree.documentElement
    next_link = None
    try:
        next_link = collection.getAttribute('more_url')
    except:
        next_link = None
    #print next_link
    return next_link

def download_all(start_url):
    fnameBase = "data_%d.xml" 
    i = 0
    nextUrl = start_url
    prev = ""
    while nextUrl:
        print "In LOOP"
        s = urllib2.urlopen(nextUrl)
        contents = s.read()
        fname = fnameBase % (i)
        
        print "Saving part %d in %s" % (i, fname) 
        f = open(fname,"w")
        f.write(contents)
        f.close()
        prev = nextUrl
        nextUrl = get_next_url(contents)
        if nextUrl == prev:
            print "Going out"
            break
        i = i + 1

        

if __name__ == "__main__":
    download_all(url)
    #s = urllib2.urlopen(url)
    #contents = s.read()
    #f = open("test.txt","w")
    #f.write(contents)
    #f.close()
