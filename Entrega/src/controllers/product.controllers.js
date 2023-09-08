import { nanoid } from "nanoid"
import { productServices } from "../services/index.js"
import { faker } from "@faker-js/faker"

export const getProducts = async (req, res) => {
    const limit = req.query.limit || 2
    const page = req.query.page || 1
    const status = req.query.status === "true" ? true : false || true
    const sort = req.query.sort === "desc" ? -1 : 1 || 1
    const category = req.query.category || undefined

    try {
        const result = await productServices.getAll(limit, page, status, sort, category)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await productServices.getById(id)
        res.status(200).json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const addProduct = async (req, res) => {
    const body = req.body
    try {
        const result = await productServices.create(body)
        res.status(201).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const result = await productServices.update(id, body)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const result = await productServices.delete(id)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const generateProduct = async (req, res) => {
    const array = []

    for (let i = 0; i < 100; i++) {
        array.push({
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price()),
            stock: 10,
            category: faker.commerce.department(),
            code: nanoid(10)
        })
    }

    try {
        const response = await productServices.create(array)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}