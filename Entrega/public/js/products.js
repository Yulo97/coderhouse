const uri = "http://localhost:8080/api/views/products?page="
const form = document.querySelector("#productForm");

const prevPage = (page) => {
    const auxPage = page - 1
    if (auxPage == 0) return
    window.location = uri + auxPage
}

const nextPage = (page) => {
    const auxPage = page + 1
    window.location = uri + auxPage
}

form.addEventListener('submit', e => {
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

    window.location = uri;
})

const addProduct = async (idProduct) => {
    const idCart = "64b44cb192dc4a631f3554e3"

    const body = {
        quantity: 1
    }

    try {
        const result = await fetch(`/api/cart/${idCart}/products/${idProduct}`, {
            method: 'put',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

document.querySelector('#logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/user/logout', {
            method: "POST"
        })

        if (response.ok) {
            window.location.href = '/api/views/login';
        } else {
            console.error('Logout fallido');
        }

    } catch (error) {
        console.log(error)
    }
})