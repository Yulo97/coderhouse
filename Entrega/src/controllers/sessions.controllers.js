import UserDTO from "../dto/user.dto.js"

export const getCurrentUser = (req, res) => {
    res.json(new UserDTO(req.user))
}