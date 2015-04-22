import json
import sys

fname = sys.argv[1]
f = open(fname, "r")

# read the schema file 
mockup = f.readlines()

f.close()
f = open(fname, "w")

# Schema name and description

for line in mockup:
	if 'Modified' in line:
		print line
	else:
		f.write(line)
		
f.close()






