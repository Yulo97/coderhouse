export const logoutUser = (req, res) => {
    req.logout((error) => {
        if (error) return res.status(500).json({ status: error, message: 'Error al realizar el logout.' });
        res.redirect('/api/views/login');
    });
}

export const redirectProducts = (req, res) => {
    res.redirect('/api/views/products')
}
