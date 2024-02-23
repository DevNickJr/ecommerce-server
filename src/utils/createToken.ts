import jwt from 'jsonwebtoken'

const createToken = async ({id, role}: { id: string, role: string }) => {
    console.log(process.env.JWT_SEC)
    const secret = process.env.JWT_SEC || ''
    return jwt.sign({id, role}, secret, { expiresIn: '1d' })}

export default createToken