let currentPrice = 0;

const deleteFromCart = (btn) => {
    const medicineId = btn.parentNode.querySelector('[name=medicineId]').value;
    const medicineDIV = btn.closest('div');
    console.log(medicineDIV);
    
    fetch('/vending-delete-medicine-from-cart/' + medicineId, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }})
        .then(result => {
            return result.json();
        })
        .then(dataFromServer => {
            medicineDIV.parentNode.removeChild(medicineDIV);
            currentPrice -= dataFromServer.price;
            console.log(dataFromServer.price);
            price.innerHTML = currentPrice;
        })
        .catch(err => {
            console.log(err);
    });
};

const addMedicineInCart = (btn) => {
    const medicineId = btn.parentNode.querySelector('[name=medicineId]').value;
    fetch('/vending-add-medicine-in-cart/' + medicineId, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }})
        .then(result => {
            return result.json();
        })
        .then(dataFromServer => {
            const addedMedicine = dataFromServer[0], error = dataFromServer[1];
            let updatedHTML = ''
            if(error) {
                errorMessage.innerHTML = '<div class="user-message user-message-error">'+ error +'</div>';
            } else {
                errorMessage.innerHTML='';
                currentPrice += addedMedicine.price;
                updatedHTML = 
                    '<div>'+
                        '<h3 class="medicine__name">'+ addedMedicine.name + ' ' + 1 + '</h3>'+
                        '<input type="hidden" name="medicineId" value="' + addedMedicine._id + '">'+
                        '<button class="btn" type="button" onclick="deleteFromCart(this)">삭제</button>'+
                    '</div>';
                medicinesCart.innerHTML += updatedHTML;
                price.innerHTML = currentPrice;
            }
            // cartData
            // .forEach(data => {
            //     currentPrice += data.medicineId.price;
            //     updatedHTML += 
            //     '<div>'+
            //         '<h3 class="medicine__name">'+ data.medicineId.name + ' ' + data.quantity + '</h3>'+
            //         '<input type="hidden" name="medicineId" value="' + data.medicineId._id + '">'+
            //         '<button class="btn" type="button" onclick="deleteFromCart(this)">삭제</button>'+
            //     '</div>';
            // })
        })
        .catch(err => {
            console.log(err);
    });
};