const socket = io();

const form = document.querySelector("#productForm");
const productList = document.querySelector("tbody");

const sendProduct = (e) => {
    e.preventDefault();

    const body = {
        title: form.querySelector("#title").value,
        description: form.querySelector("#description").value,
        price: Number(form.querySelector("#price").value),
        code: form.querySelector("#codigo").value,
        stock: Number(form.querySelector("#stock").value),
        category: form.querySelector("#category").value
    }

    fetch('/api/product', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => result.json())
        .then(result => {
            if (result.status == 'error') throw new Error(result.error)
        })
        .catch(error => console.log(error))
    socket.emit('viewProducts')
};



form.addEventListener('submit', sendProduct);

document.addEventListener("DOMContentLoaded", function (event) {
    socket.emit('viewProducts')

    socket.on('products', data => {
        if (data !== null) {
            productList.innerHTML = '';

            data.forEach((product) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                        `;
                productList.appendChild(tr);
            });
        }
    })

    // socket.on('updateProducts', (data) => {
    //     if (data !== null) {
    //         // Limpiar la lista de productos existente
    //         productList.innerHTML = '';

    //         // Recorrer los datos de productos y agregar filas a la tabla
    //         data.forEach((product) => {
    //             const tr = document.createElement('tr');
    //             tr.innerHTML = `
    //                 <td>${product.title}</td>
    //                 <td>${product.category}</td>
    //                 <td>${product.description}</td>
    //                 <td>${product.price}</td>
    //                 <td>${product.code}</td>
    //                 <td>${product.stock}</td>
    //             `;
    //             productList.appendChild(tr);
    //         });
    //     }
    // });
});