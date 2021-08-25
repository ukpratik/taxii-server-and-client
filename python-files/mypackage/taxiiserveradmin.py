import requests
from requests.auth import HTTPBasicAuth
from pymongo import MongoClient
import schedule

URL = 'https://192.168.2.182:5000/taxii2/'
STATUS_CODE_OK = 200
MEDIA_TYPE_TAXII_V21 = 'application/taxii+json; charset=utf-8; version=2.1'
API_ROOTS = []
USERNAME = 'admin'
PASSWORD = 'vehere@123'

response = ''
discovered_data = ''
token = ''
headers = {'token':token}

def discovery(url=URL,username=USERNAME,password=PASSWORD):
    if username == '' or password == '':
        res = requests.get(url)
    else:
        res = requests.get(url,auth=(username,password ), verify=False  ) #verify='~Desktop/nodejs/python-files/certs/vehere.com.crt'   cert=('../certs/vehere.com.crt','../certs/vehere.com.key')
        print(res.headers)
        token = res.headers['token']
        headers = {'token':token}
        print(res.cookies)
        print(token)
    return res.json()

def set_api_roots(): # API_ROOTS=API_ROOTS
    API_ROOTS = discovery()['api_roots']
    return API_ROOTS

def enlist_api_roots():
    for api_root in API_ROOTS:
        print(api_root)

def get_api_root_info(api_root,username=USERNAME,password=PASSWORD):   # in future add username & password , i.e basic authentication
    res = requests.get(api_root,auth=(username,password ),verify=False,headers=headers)
    return res.json()

def get_status_with_id(api_root,status_id,username=USERNAME,password=PASSWORD):   # in future add username & password , i.e basic authentication
    res = requests.get(api_root + 'status/' + str(status_id) + '/',auth=(username,password ),verify=False,headers=headers)
    return res.json()

def get_collections(api_root,username=USERNAME,password=PASSWORD):   # in future add username & password , i.e basic authentication
    # headers = {'token':token}
    res = requests.get(api_root + 'collections/',auth=(username,password ),verify=False)
    # print(res.content)
    # print(res.cookies)
    return res.json()

def get_collections_with_id(api_root, id,username=USERNAME,password=PASSWORD):
    res = requests.get(api_root + 'collections/' + id,auth=(username,password ),verify=False)
    return res.json()

def get_collections_with_id_manifest(api_root, id,username=USERNAME,password=PASSWORD):
    res = requests.get(api_root + 'collections/' + id + '/manifest/',auth=(username,password ),verify=False)
    return res.json()
    
def get_collections_with_id_objects(api_root, id,username=USERNAME,password=PASSWORD):
    res = requests.get(api_root + 'collections/' + id + '/objects/',auth=(username,password ),verify=False,headers=headers) 
    return res.json()
    
def get_collections_with_id_object_id(api_root, id, object_id,username=USERNAME,password=PASSWORD):
    res = requests.get(api_root + 'collections/' + id + '/objects/' + object_id,auth=(username,password ),verify=False,headers=headers)
    return res.json()
    

def push(dbname,coll):
    if coll != '':
        db = MongoClient()[dbname][coll]
        if db.find({}) == '':     
            db.insert_one(coll)


def push_collections(api_root, coll_data):
    dbname = api_root.split('/')[-2]
    print(dbname)
    # print(coll_data)
    db = MongoClient()[dbname]['collections']
    for collection in coll_data:
        print(collection)
        db.insert_one(collection)

def push_status(api_root,status_data):
    dbname = api_root.split('/')[-2]
    print(dbname)
    db = MongoClient()[dbname]['status']
    for data in status_data:
        print(data)
        db.insert_one(data)

def push_discovery_api_root(data):
    dbname = 'taxii'
    API_ROOTS.append(data)
    db = MongoClient()[dbname]['discovery']
    db.update_one({"title": "Some TAXII Server"},{ "$set": {'api_roots' : API_ROOTS}})

# r = requests.get(URL)

# print(discovery())
# API_ROOTS = discovery()['api_roots']

# enlist_api_roots()
# print(get_api_root_info(api_root=API_ROOTS[0]))

# print(get_collections(API_ROOTS[0]))
# print(API_ROOTS)

# push_discovery_api_root('http://localhost:5000/general_collections/')
# push_collections(API_ROOTS[-1],get_collections(API_ROOTS[0]))
# {"title": "Some TAXII Server"},{'$set' : {"api_roots" : ["http://localhost:5000/api1/","http://localhost:5000/api2/","http://localhost:5000/trustgroup1/"]}}