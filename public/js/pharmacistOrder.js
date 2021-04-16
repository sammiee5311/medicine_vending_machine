const callPharmacist = (btn) => {
    video.innerHTML = 
    '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
    // '<iframe src="https://localhost:8080/" allow="geolocation; microphone; camera" style="width:300px; height:300px; margin:1%"></iframe>';
}

const endCallPharmacist = (btn) => {
    video.innerHTML = '';
}
