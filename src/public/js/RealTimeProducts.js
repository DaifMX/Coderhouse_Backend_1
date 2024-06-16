import { getCard } from "./LoadProducts.js";
const socket = io();

const productsForm = document.getElementById('productsForm');

productsForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(productsForm);

    fetch('/api/products', {
        method: 'POST',
        body: data,
    });
});

//Mostrar productos en la página web en tiempo real.
socket.on('newProduct', data => {
    const productsContainer = document.getElementById('productsContainer');
    
    const { type, values } = data;

    if (type === 'UPDATE') {
        productsContainer.innerHTML = '';
        values.forEach(element => {
            const card = getCard(element);
            productsContainer.innerHTML += card.innerHTML;
        });
        console.log('update');
        return;

    } else if (type === 'CREATE') {
        console.log('create')
        const card = getCard(values)
        productsContainer.appendChild(card)
    }
});