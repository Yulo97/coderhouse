export default class UserDTO {
    constructor(user) {
        if (user) {
            this.first_name = user.first_name || '';
            this.last_name = user.last_name || '';
            this.email = user.email || '';
        } else {
            this.first_name = '';
            this.last_name = '';
            this.email = '';
        }
    }
}