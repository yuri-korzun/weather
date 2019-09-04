console.log('file loaded');



const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    message2.textContent = '';
    message1.textContent = 'loading...';

    fetch(`/weather?address=${search.value}`)
        .then(result => result.json())
        .then(data => {
            message1.textContent = '';

            if (data.error) {
                message2.textContent = data.error;
            } else {
                message2.textContent = data.forecast;
            }
        });
});
