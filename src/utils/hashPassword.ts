import bcrypt from 'bcrypt'

const SALT = Number(process.env.SALT)

const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, SALT)
    return hash
}

export default hashPassword