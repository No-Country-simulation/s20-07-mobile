import bcrypt from 'bcrypt';
import db from '../common/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

export const registerUser = async (email: string, password: string) => {
    const existingUser = await db.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new Error('Usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
        data: { email, password: hashedPassword }
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export const loginUser = async (email: string, password: string) => {
    const user = await db.user.findFirst({ where: { email } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};