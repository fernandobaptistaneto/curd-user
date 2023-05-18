
import { Request, Response } from 'express'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import jwt from 'jsonwebtoken'


export class AuthController {

    async autenticarUsuario(req: Request, res: Response) {
        const { username, password } = req.body

        const usuario = await UsuarioRepository.findOne({ where: { username } })

        if (!usuario) {
            return res.status(401).json({ message: 'Usuário inválido' });
        }

        const isValidPassword = await bcrypt.compare(password, usuario.password)

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Senha inválida' });
        }


        const token = jwt.sign({ id_usuario: usuario.id_usuario }, 'secret', { expiresIn: '1d' })

        return res.status(200).send({ message: 'Login efetuado com sucesso!', auth: true, token: token, id_usuario: usuario.id_usuario })
    }
}

export default new AuthController();