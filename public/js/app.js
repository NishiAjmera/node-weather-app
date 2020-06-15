const form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

msg1.textContent= 'loading weather';

document.addEventListener('submit', (e)=>{
    e.preventDefault();
    const address = search.value;
    const url = '/weather?address=' + address;

    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error){
                msg1.textContent= 'loading weather';
                msg2.textContent = data.error;
                // console.log(data.error)
            }else {
                msg1.textContent = address;
                msg2.textContent = JSON.stringify(data.resp);
                // console.log(data);
                // console.log(data.latitude);
                // console.log(data.longitude);
            }
        })
    })
})

