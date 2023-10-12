import supertest from "supertest"
import Assert from "assert"

const requester = supertest('http://localhost:8080')

const assert = Assert.strict

describe('Supertest CART', () => {
    it('La ruta raiz devuelve status 200', async () => {
        const response = await requester.get('/api/cart')
        // Asegura que la respuesta tenga un código de estado 200 (OK)
        assert.strictEqual(response.status, 200);
    });

    it('La respuesta es tipo JSON', async () => {
        const response = await requester.get('/api/cart')
        // Asegura que la respuesta sea un objeto JSON
        assert.strictEqual(response.type, 'application/json')
    });
});