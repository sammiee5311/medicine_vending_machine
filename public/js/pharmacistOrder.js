const socket = io.connect('http://localhost:3000');

socket.on('medicineList', medicineIds => {
    getMedicinesList(medicineIds);
});

const callPharmacist = async (btn) => {
    try {
        const pharmacistDBNumber = btn.parentNode.querySelector('[name=callSignal]').value;
        const result = await fetch('/pharmacist-get-pharmacist-id/' + pharmacistDBNumber, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});

        const dataFromServer = await result.json();
        const roomId = dataFromServer._id;
        const pharmacistName = dataFromServer.name;

        socket.emit('group1', { room: roomId }); // group1 -> pharmacistDBNumber
        socket.on('checkConnection', data =>{
            if (data === 'success'){
                video.innerHTML = '<div class="medicine__name"> 약사 이름 : '+ pharmacistName +'</div>';
                video.innerHTML += 
                '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
                // '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
            }
        });

    } catch (err) {
        console.log(err);
    }
};

const endCallPharmacist = (btn) => {
    video.innerHTML = '';
};

const cancel = () => {
    window.location.href='/';
}

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
