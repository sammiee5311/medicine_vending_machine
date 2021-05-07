const socket = io.connect('http://localhost:3000');
const callColor = "changeOrderColor";
const endCallColor = "changeCancelColor";

socket.on('medicineList', medicineIds => {
    getMedicinesList(medicineIds);
});

const callPharmacist = async (btn) => {
    changeBtnColor(btn, callColor);
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

const endCallPharmacist = async (btn) => {
    changeBtnColor(btn, endCallColor);
    video.innerHTML = '';

    try {
        const result = await fetch('/pharmacist-save-video-file', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});
        
        const dataFromServer = await result.json();
        // console.log(dataFromServer);
    } catch (err) {

    }
};

const getMedicinesList = async (medicineIds) => {
    try{
        const result = await fetch('/pharmacist-get-medicines/' + medicineIds.join(), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});
        
        const dataFromServer = await result.json();
        
        console.log(dataFromServer);
    } catch (err) {
        console.log(err);
    }
};
