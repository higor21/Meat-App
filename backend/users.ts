export class User {
    constructor(
        public name: string, 
        public email: string,
        private password: string
    ){}

    matches(another: User): boolean {
        return another && this.email === another.email && this.password === another.password
    }
}

export const users: {[key: string]: User} = {
    "higor@gmail.com": new User("higor", "higor@gmail.com", "higor21"),
    "felype@gmail.com": new User("felype", "felype@gmail.com", "felype21"),
    "silva@gmail.com": new User("silva", "silva@gmail.com", "silva21")
}