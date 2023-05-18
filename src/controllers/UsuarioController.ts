
import { Request, Response } from 'express'
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import bcrypt from 'bcryptjs';

export class UsuarioController {


    async list(req: Request, res: Response): Promise<Response> {
        const usuario = await UsuarioRepository.find()
        return res.json(usuario)
    }

    async atualizarDados(req: Request, res: Response): Promise<Response> {
        const { id_usuario } = req.query
        const { username, password } = req.body

        //validar se existe id
        const idExists = await UsuarioRepository.findOne({ where: { id_usuario: Number(id_usuario) } })
        //validar se existe id
        if (!idExists) {
            return res.status(404).json({ message: 'Id não existe!' })
        }

        // Encrypta a senha
        const passwordEncript = bcrypt.hashSync(idExists.password, 8)

        //update usuário
        const update = await UsuarioRepository.createQueryBuilder().update(idExists).set({
            username: username,
            password: passwordEncript,
        }).where("id_usuario = :id_usuario", { id_usuario: id_usuario }).returning('*').execute()


        //retornar update
        return res.json({ message: 'Dados alterados com sucesso', dados: update.raw })
    }

    //Lista um usuário especifico por parametro :id
    async listarUsuarioId(req: Request, res: Response) {
        const { id_usuario } = req.query
        const usuario = await UsuarioRepository.findOne({ where: { id_usuario: Number(id_usuario) } })
        return res.json({ message: 'Usuário Encontrado:', usuario: usuario })
    }

    // Cria um novo usuário
    async usuarioCreate(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body

        const usuarioExists = await UsuarioRepository.findOne({ where: { username } })

        if (usuarioExists) {
            return res.status(409).json({ message: 'Usuário já existe!' });
        }
        try {
            const usuario = UsuarioRepository.create({ username, password })
            await UsuarioRepository.save(usuario)
            return res.json({ message: 'Usuário criado com sucesso!', dadosNovoUsuario: usuario })

        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error })
        }
    }

    //deleta usuario
    async usuarioDelete(req: Request, res: Response) {
        const { id_usuario } = req.query

        //validar se existe id
        const deleteId = await UsuarioRepository.findOne({ where: { id_usuario: Number(id_usuario) } })

        //validar se existe id
        if (!deleteId) {
            return res.status(404).json({ message: 'ID não encontrado!' })
        }

        const update = await UsuarioRepository.createQueryBuilder('usuario').delete().where("id_usuario = :id_usuario", { id_usuario: id_usuario }).returning('*').execute()

        //retornar dados deletados
        return res.json({ message: 'Dados deletados com sucesso!', dados_deletados: update.raw })
    }
}

export default new UsuarioController();