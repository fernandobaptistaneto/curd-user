import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'


export interface TokenPayLoad {
  id_usuario: string
  iat: number
  exp: number
}


export default function verifyJWT(req: Request, res: Response, next: NextFunction) {

  // Verifico se existe authorization no headers: caso exista Bearer: 'TOKEN GERADO' ele segue com a function, senão retorna res.status 401
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401);
  }

  //  Limpa a string token retirando o 'Bearer' restando apenas o código token
  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, 'secret')

    const { id_usuario } = data as TokenPayLoad

    req.userId = id_usuario



    return next()
  } catch {
    return res.sendStatus(401)
  }


}

