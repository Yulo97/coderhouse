export const getCurrentUser = (req, res) => {
    res.json({ user: req.user })
}