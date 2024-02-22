import jwt from 'jsonwebtoken'

const createToken = async (_id: string) => {
    console.log(process.env.JWT_SEC)
    const secret = process.env.JWT_SEC || ''
    return jwt.sign(_id, secret, { expiresIn: '1d' })}

export default createToken