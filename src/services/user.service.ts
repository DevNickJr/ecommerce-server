import { User } from "../models"
import CRUD from "./crud"

const { hashPassword, CustomError } = require('../utils')

class UserService extends CRUD {
    async update(id: string, bd: any) {
        const { password, ...body } = bd
        if (password) {
            const hash = await hashPassword(password)
            body.password = hash
        }
        const data = await this.updateOne(id, body)
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }

    async findAllUsers({ order=undefined, limit=10, page=1 } = {}, query={}, populate='') {
        const pge = page || 1
        const data = await this.getAll({
            page: pge,
            limit,
            order
          }, query)
        if (!data) throw new Error(`${this.serviceName} does not exist`)
        return data
    }
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