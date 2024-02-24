import { IUser } from '../interfaces'
import { User } from '../models/User'
import createToken from '../utils/createToken'
import CustomError from '../utils/customError'
import hashPassword from '../utils/hashPassword'
import CRUD from './crud'
import bcrypt from "bcrypt"

class AuthService extends CRUD<User> {
    static async signup(fields: IUser) {

        // if (!validator.isStrongPassword(password))
        //     throw new Error(
        //         'Password Not Strong Enough, must be minimum of 8 characters, with at least 1 uppercase, lowercase, number and symbol'
        // )
        let user = await User.findOne({ where: { email: fields.email }})
        if (user) throw new Error('Email Already exists')

        const hash = await hashPassword(fields.password)
        
        const newUser = (await User.create({ email: "", password: hash, lastName: "", firstName: '' })).toJSON()
        if (!newUser) throw new Error('Failed to create User')

        const token = await createToken({ id: newUser.id!, role: newUser.role! })

        return { user: newUser, token }
    }

    static async signin(fields: Pick<IUser, "password" | "email">) {
        const user = (await User.findOne({ where: { email: fields.email }}))?.toJSON()
        if (!user) throw new CustomError('User does not exists', 404)
    
        const match = await bcrypt.compare(fields.password, user.password)
        if (!match) throw new CustomError('Username or Password Incorrect', 400)
    
        const token = await createToken({ id: user.id!, role: user.role! })
    
        return { user, token }
    }
}

export default AuthService