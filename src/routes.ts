import { Router } from "express";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middlewares/authMiddleware";
import UsuarioController from "./controllers/UsuarioController";


const router = Router();


router.post('/usuarioCreate', UsuarioController.usuarioCreate)
router.post('/login', AuthController.autenticarUsuario)
router.get('/usuarioId', authMiddleware, UsuarioController.listarUsuarioId)
router.put('/usuarioUpdate', authMiddleware, UsuarioController.atualizarDados)
router.delete('/usuarioDelete', authMiddleware, UsuarioController.usuarioDelete)
router.get('/usuarioList', UsuarioController.list)



export default router