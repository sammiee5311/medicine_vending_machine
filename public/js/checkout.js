const orderColor = "changeOrderColor";

const checkout = (btn) => {
    const url = btn.parentNode.querySelector('[name=ok]').value;
    changeBtnColor(btn, changeOrderColor);
    window.location.href='/'+url+'-clear-cart';
}

const orderMedicines = async (btn) => {
    const url = btn.parentNode.querySelector('[name=ok]').value;
    changeBtnColor(btn, orderColor);
    
    try{
        const result = await fetch(`/${url}-order-medicine`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});

        const dataFromServer = await result.json();
        
        let updatedHTML = ''
        let price = 0;
        dataFromServer.forEach(medicinesInfo => {
            price += medicinesInfo.medicine.price;
            updatedHTML += 
                '<ul>' +
                    `<li> <h3> ${medicinesInfo.medicine.name} : ${medicinesInfo.medicine.price} 원 </h3> </li>` +
                '</ul>';
        });

        if(price > 0) {
            errorMessage.innerHTML = '';
            updatedHTML += 
            '<div>' +
            `<h3>총 가격: ${price} 원 </h3>` +
            '</div>' +
            `<input type="hidden" name="ok" value=${url}>`+
            '<button class="ok" id="ok" onclick="checkout(this)">결제하기</button>' +
            '<button class="cancel" id="cancel" onclick="cancelOrderMedicines(this)">취소하기</button>';  

            light.innerHTML = updatedHTML;

            document.getElementById('light').style.display='block';
            document.getElementById('fade').style.display='block';
        } else {
            const error = '장바구니가 비었습니다.';
            $('#errorMessage').fadeIn();
            errorMessage.innerHTML = `<div class="user-message user-message-error"> ${error} </div>`;
        }
        $('#errorMessage').fadeOut(3000);
    } catch (err) {
        console.log(err);
    }
}

const cancelOrderMedicines = (btn) => {
    changeBtnColor(btn, cancelColor);
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
}