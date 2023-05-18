import { appDataSource } from "../database/data-source"
import { Usuario } from "../entities/Usuario"

export const UsuarioRepository = appDataSource.getRepository(Usuario)