import json

medicine_location = {
    '606b0ec24bfa6841ec0e270d': 
        {
            'name': 'band',
            'location': (0,0), 
        },
    '606b0f628393482c4ccec9f8': 
        {
            'name': 'who',
            'location': (0,1), 
        },
    '606b0f882c24732844a653c6': 
        {
            'name': 'hwal',
            'location': (0,2), 
        },
    '60798ad7d0941130281ecffd': 
        {
            'name': 'ga',
            'location': (1,0), 
        },
    '60798b15d0941130281ecffe': 
        {
            'name': 'lemoa',
            'location': (1,1), 
        },
    '60798b44d0941130281ecfff': 
        {
            'name': 'mask',
            'location': (1,2), 
        }
} 

with open("./medicine_location.json", "w", encoding='UTF-8') as json_file:
    json.dump(medicine_location, json_file, ensure_ascii = False)