import userModel from "../dao/models/user.model.js";

export const createUser = async (req, res) => {
    const body = req.body
    try {
        const result = await userModel.create(body)
        res.json({ status: "success", payload: result })
    } catch (error) {
        res.json({ status: "error", error: error })
    }
}

export const logoutUser = (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({ status: error, message: 'Error al realizar el logout.' });
        }
        res.redirect('/api/views/login');
    });
}

