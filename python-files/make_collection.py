import json
from stix2 import parse
id = "397fed99-08xz-test-a1b3-fb247eb41d01"
title = "Created the collection having the Observables"
description = "This data collection is for testing adding objects"
can_read = True
can_write = True
media_types = ["application/stix+json;version=2.1"]
objects = []
manifest = []

filename = 'dom-bl.intel_stix_format'
objs = open(filename,'r').read().split(',')

for obj in objs:
    if len(obj) < 2:
        continue
    objects.append(obj)

collection = '''{"id": {id},"title": {title},"can_read": {can_read},"can_write": {can_write},"media_types": {media_types},"objects": {objects},"manifest": {manifest}
}'''.format(id=id,title=title,can_read=can_read,can_write=can_write,media_types=str(media_types),objects=str(objects),manifest=str(manifest))

obj = parse(collection)
print(type(obj))
print(obj.serialize(pretty=True))
open("collection_" + filename,'w').write(str(json.loads(str(collection))))
