from stix2 import Identity
import os

files = []
for file in os.listdir('Zeek-Intelligence-Feeds-master/'):
    if file[-6:] == ".intel":
        files.append(file)

# print(files)

for file in files:
    data_lines = open('Zeek-Intelligence-Feeds-master/' + file).read().split('\n')
    #fields	indicator	indicator_type	meta.source	meta.do_notice	meta.desc
    # 1l88.cc	Intel::DOMAIN	Domain-Blacklist	F	Compromised-Domains
    stix_file = file + '_stix_object_format'
    open('stix_objects/' + stix_file + '.json','w')
    for data_line in data_lines:
        if len(data_line) < 2:
            continue
        data = data_line.split('\t')
        if len(data) < 2:
            continue
        if data[0][:1] == '#':
            continue
        indicator = data[0]
        indicator_type = data[1]
        source = data[2]
        do_notice = data[3]
        desc = data[4]

        pattern = "[domain:value = " + str(indicator) + "]"

        indicator = Identity(name="Malicious site hosting or downloader",indicator_types=[indicator_type],pattern=pattern,meta_source = source,meta_do_notice = do_notice,pattern_type="stix",description=desc,allow_custom=True)
        
        # print(indicator.serialize(pretty=True))
        open('stix_objects/' + stix_file + '.json','a').write(str(indicator.serialize(pretty=True)) + ',')    
