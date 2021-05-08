let currentPrice = 0;
const mainColor = "changeColor";
const cancelColor = "changeCancelColor";
const transparentColor = "changeTransparentColor";

const deleteFromCart = async (btn) => {
    const medicineId = btn.parentNode.querySelector('[name=medicineId]').value;
    const medicineDIV = btn.closest('div');

    try{
        const result = await fetch('/vending-delete-medicine-from-cart/' + medicineId, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});
        
        const dataFromServer = await result.json();
        medicineDIV.parentNode.removeChild(medicineDIV);
        currentPrice -= dataFromServer.price;
        price.innerHTML = currentPrice;

    } catch (err) {
        console.log(err);
    }
};

const addMedicineInCart = async (btn) => {
    changeBtnColor(btn, transparentColor);
    const medicineId = btn.parentNode.querySelector('[name=medicineId]').value;
    try{
        const result = await fetch('/vending-add-medicine-in-cart/' + medicineId, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
        }});
        
        const dataFromServer = await result.json();
        
        const addedMedicine = dataFromServer[0], error = dataFromServer[1];
        let updatedHTML = ''
        if(error) {
            errorMessage.innerHTML = `<div class="user-message user-message-error">${error}</div>`;
            $('#errorMessage').fadeIn();
        } else {
            errorMessage.innerHTML='';
            currentPrice += addedMedicine.price;
            updatedHTML = 
                '<div>'+
                    `<div class="medicineCartItem">`+
                        `<h3 class="medicine__name">${addedMedicine.name}</h3>`+
                        `<input type="hidden" name="medicineId" value="${addedMedicine._id}">`+
                        '<button class="btn" type="button" onclick="deleteFromCart(this)">삭제</button>'+
                    `</div>`+
                '</div>';
            medicinesCart.innerHTML += updatedHTML;
            price.innerHTML = currentPrice;
        }
        $('#errorMessage').fadeOut(3000);
    } catch (err) {
        console.log(err);
    }
};

const medicineSortByTag = async (btn) => {
    const categoryName = btn.parentNode.querySelector('[name=categoryName]').value;

    try{
        const dataFromServer = await fetch('/vending-sort-by-tag/' + categoryName, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});
        
        const medicines = await dataFromServer.json();
        medcineList.innerHTML = '';
        medicines.forEach(medi => {
            if (medi.medicineId.category.includes(categoryName)) { 
                medcineList.innerHTML +=
                '<article class="card_medicine_item">'+
                    '<header class="card__header">'+
                        `<h1 class="medicine__name">${medi.medicineId.name}</h1>`+
                    '</header>'+
                    '<div class="card__image">'+
                        `<input type="hidden" name="medicineId" value="${medi.medicineId._id}">`+
                        `<img src="${medi.medicineId.imageUrl}" type="button" onclick="addMedicineInCart(this)">`+
                    '</div>'+
                    '<div class="card__content">'+
                        `<h2 class="medicine__price">${medi.medicineId.price}</h2>`+
                        '<p class="medicine__description">'+
                            `${medi.quantity} 개<br>`+
                        '</p>'+
                    '</div>'+
                '</article>';
            }
        });

    } catch (err){
        console.log(err);
    }
}

const cancel = (btn) => {
    changeBtnColor(btn, cancelColor);
    window.location.href='/';
};

const changeBtnColor = (btn, color=mainColor) => {
    btn.classList.add(color);
    setTimeout( () => {
        btn.classList.remove(color)
    }, 90);
};