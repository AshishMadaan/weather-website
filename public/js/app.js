console.log('Client side JS is loading!!');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');

const messageContent1 = document.querySelector('#message-content1')
const messageContent2 = document.querySelector('#message-content2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = input.value;
    messageContent1.textContent = "Loading..."
    messageContent2.textContent = ""

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageContent1.textContent = data.error
            }else{
                messageContent1.textContent = data.placeName
                messageContent2.textContent = data.forecast
            }
        })
    })

})