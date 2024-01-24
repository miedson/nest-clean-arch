export default class User {
    constructor(private username: string, private password: string, private dateofbirth: Date, private id?: string) {
        if(this.username === undefined || this.password === undefined) {
            throw new Error("User or password empty");
        }
        if(Math.abs((new Date).getFullYear() - this.dateofbirth.getFullYear()) < 18) {
            throw new Error("Age minor");
        }
    }
}