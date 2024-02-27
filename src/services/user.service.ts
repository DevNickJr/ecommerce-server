import { User } from "../models"
import CustomError from "../utils/customError"
import hashPassword from "../utils/hashPassword"
import CRUD from "./crud"


class UserService extends CRUD<User> {
    async update(id: number, bd: any) {
        const { password, role, ...body } = bd
        if (password) {
            const hash = await hashPassword(password)
            body.password = hash
        }
        const data = await this.updateOne({ id }, body)
        if (!data) throw new CustomError(`${this.serviceName} does not exist`, 400)
        return data
    }

    // async findAllUsers({ order=undefined, limit=10, page=1, query={} } = {}) {
    //     const pge = page || 1
    //     const data = await this.getAll({
    //         page: pge,
    //         limit,
    //         order,
    //         query
    //       })
    //     if (!data) throw new CustomError(`${this.serviceName} does not exist`, 400)
    //     return data
    // }
    // async getAllUsers() {

    // }
    // async getOneUser() {

    // }
    // async updateUser() {

    // }
    // async deleteUser() {

    // }
}

export default new UserService(User, 'User')