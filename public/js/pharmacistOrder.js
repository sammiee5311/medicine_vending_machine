const socket = io.connect('http://localhost:3000');

socket.on('posts', data => {
    if(data.action === 'create'){
        console.log(data.roomName);
    }
});

socket.on('medicineList', medicineIds => {
    getMedicinesList(medicineIds);
});

const callPharmacist = (btn) => {
    video.innerHTML = 
    '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
    // '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
};

const endCallPharmacist = (btn) => {
    video.innerHTML = '';
};

const getMedicinesList = (medicineIds) => {
    fetch('/pharmacist-get-medicines/' + medicineIds.join(), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }})
        .then(result => {
            return result.json();
        })
        .then(dataFromServer => {
            console.log(dataFromServer);
        })
        .catch(err => {
            console.log(err);
    });
};
