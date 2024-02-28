import { User } from '../models/User'
import createToken from '../utils/createToken'
import CustomError from '../utils/customError'
import hashPassword from '../utils/hashPassword'
import CRUD from './crud'
import bcrypt from "bcrypt"

class AuthService extends CRUD<User> {
    static async signup(fields: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>) {

        // if (!validator.isStrongPassword(password))
        //     throw new CustomError(
        //         'Password Not Strong Enough, must be minimum of 8 characters, with at least 1 uppercase, lowercase, number and symbol'
        // )
        let user = await User.findOne({ where: { email: fields.email }})
        if (user) throw new CustomError('Email Already exists', 400)

        const hash = await hashPassword(fields.password)
        
        const newUser = (await User.create({ ...fields, password: hash })).toJSON()
        if (!newUser) throw new CustomError('Failed to create User', 400)

        const token = await createToken({ id: newUser.id, role: newUser.role! })

        return { user: newUser, token }
    }

    static async signin(fields: Pick<User, "password" | "email">) {
        const response = await User.findOne({ where: { email: fields.email }})
        if (!response) throw new CustomError('User does not exists', 404)

        const {password, ...user} = response.toJSON()
    
        const match = await bcrypt.compare(fields.password, password)
        if (!match) throw new CustomError('Username or Password Incorrect', 400)
    
        const token = await createToken({ id: user.id!, role: user.role! })
    
        return { user, token }
    }
}

export default AuthService