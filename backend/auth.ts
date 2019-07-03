import { Request, Response } from 'express'
import { User, users } from './users'

import * as jwt from 'jsonwebtoken'
import { apiConfig } from './api-config';

export const handleAuthentication = (req: Request, res: Response) => {
    const user: User = req.body
    if(isValid(user)){
        const dbUser: User = users[user.email]

        /*
            sub: refere-se a identificação do usuário
            iss: refere-se a identificação de quem está fornecendo o token (no caso é a própria aplicação)
        */
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret )
        res.json({name: dbUser.name, email: dbUser.email, accessToken: token})
    }else{
        res.status(403).json({message: 'Dados inválidos!'})
    }
}

function isValid(user: User): boolean {
    if(!user) return false
    const dbUser: User = users[user.email]
    return dbUser && dbUser.matches(user)
}