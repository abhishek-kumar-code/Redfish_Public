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
	if '.1.00.' in line:
		output = line.replace('.1.00.', '.1.0.')
		print 'Fixed version: ' + line + '\n'
		f.write(output)
	else:
		f.write(line)
		
f.close()






