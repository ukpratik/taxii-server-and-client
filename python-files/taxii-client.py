import requests
from requests.api import request

# URL = 'https://test.taxiistand.com/read-write/services/discovery'
# https://limo.anomali.com/api/v1/taxii/taxii-discovery-service/
# https://test.taxiistand.com/read-write/services/discovery
# http://hailataxii.com/taxii-discovery-service
# https://cti-taxii.mitre.org/taxii/
URL = 'http://localhost:5000/taxii2/'
STATUS_CODE_OK = 200
MEDIA_TYPE_TAXII_V21 = 'application/taxii+json; charset=utf-8; version=2.1'

r = requests.get(URL)
response = ''
API_ROOTS = []
# print(r)
print(r.headers)
print('\n')
if r.status_code == STATUS_CODE_OK:
    print('got status code OK')
    print('\n')
    # print(r.headers['content-type'])
    # print(type(r.headers['Content-Type']))
    content_type = r.headers['content-type']
    if content_type == MEDIA_TYPE_TAXII_V21:
        print('Getting discovery data ...')
        print('\n')
        response = r.json()
        print(response)

# print('\n')
# print(response['api_roots'])
API_ROOTS.extend(response['api_roots'])

def api_information(api_roots=API_ROOTS):
    print('Number of Api Roots : ' + str(len(api_roots)))
    sr_no = 0
    for api in api_roots:
        print(str(sr_no) + " | " + api)

def get_api_root(url):
    r = requests.get(url)
    res = r.json()
    print(res)
    return res

api_information()