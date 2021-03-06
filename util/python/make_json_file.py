import json

medicine_location = {
    '606b0ec24bfa6841ec0e270d': 
        {
            'name': 'band',
            'pinNumber': 'd:5:p', 
        },
    '606b0f628393482c4ccec9f8': 
        {
            'name': 'who',
            'pinNumber': 'd:6:p', 
        },
    '606b0f882c24732844a653c6': 
        {
            'name': 'hwal',
            'pinNumber': 'd:7:p', 
        },
    '60798ad7d0941130281ecffd': 
        {
            'name': 'ga',
            'pinNumber': 'd:9:p', 
        },
    '60798b15d0941130281ecffe': 
        {
            'name': 'lemoa',
            'pinNumber': 'd:10:p', 
        },
    '60798b44d0941130281ecfff': 
        {
            'name': 'mask',
            'pinNumber': 'd:11:p', 
        }
} 

with open("./medicine_location.json", "w", encoding='UTF-8') as json_file:
    json.dump(medicine_location, json_file, ensure_ascii = False)