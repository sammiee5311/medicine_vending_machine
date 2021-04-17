const checkout = (btn) => {
    window.location.href="/clear-cart";
}

const orderMedicines = () => {
    console.log('결제중..');
    fetch('/order-medicine', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }})
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(dataFromServer => {
            let updatedHTML = ''
            let price = 0;
            dataFromServer.forEach(medicinesInfo => {
                price += medicinesInfo.medicine.price;
                updatedHTML += 
                    '<ul>' +
                        '<li> <h1>' + medicinesInfo.medicine.name + ': 1 개</h1> </li>' +
                    '</ul>';
            });

            updatedHTML += 
                '<div>' +
                '<h2>총 가격: ' + price  + '</h2>' +
                '</div>' +
                '<button class="btn" type="button" onclick="checkout()">결제하기</button>' +
                '<button class="btn" type="button" onclick="cancelOrderMedicines()">취소하기</button>';  

            light.innerHTML = updatedHTML;

            document.getElementById('light').style.display='block';
            document.getElementById('fade').style.display='block';
        })
        .catch(err => {
            console.log(err);
    });
}

const cancelOrderMedicines = () => {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
}