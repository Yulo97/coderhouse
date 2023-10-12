import supertest from "supertest"
import Assert from "assert"
import {faker} from "@faker-js/faker"

const requester = supertest('http://localhost:8080')

const assert = Assert.strict

describe('Supertest de User', () => {
    const email =  faker.internet.email()

    const user = {
        first_name: "Guillermo",
        last_name: "Francella",
        email,
        password: "secret"
    }

    it('Se registra un usuario', async () => {
        const response = await requester.post('/api/user/register').send(user)
        
        // Asegura que la respuesta tenga un código de estado 203 (OK)
        assert.strictEqual(response.status, 302);

        // Asegura que la redirección sea a la página de productos
        assert.strictEqual(response.headers.location, '/api/views/products');
    });

    it('Iniciar sesión con credenciales válidas', async () => {
        const response = await requester.post('/api/user/login').send({username: email, password: user.password});
        
        // Asegura que la respuesta tenga un código de estado 302 (redirección exitosa)
        assert.strictEqual(response.status, 302);

        // Asegura que la redirección sea a la página de productos
        assert.strictEqual(response.headers.location, '/api/views/products');
    });

    it('Iniciar sesión con credenciales inválidas', async () => {
        const userInvalid = {
            username: "usuario_invalido",
            password: "contraseña_invalida"
        };

        const response = await requester.post('/api/user/login').send(userInvalid);

        // Asegura que la respuesta tenga un código de estado 302 (redirección de fallo)
        assert.strictEqual(response.status, 302);

        // Asegura que la redirección sea a la página de inicio de sesión
        assert.strictEqual(response.headers.location, '/api/views/login');
    });
});