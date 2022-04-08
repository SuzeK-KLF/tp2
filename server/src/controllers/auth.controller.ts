import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserConnection } from '../../../common/userConnection';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController{
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService, 
                       @inject(TYPES.MongodbService) private _mongodbService: MongodbService){
        //empty
    }

    public get router() : Router {
        
        const router: Router = Router();

        // -> /api/v1/auth/login
        router.post('/login',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403 
            // 在数据库中查找用户，如果用户为空，返回代码403

            //TODO Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
            //Retournez le code 403 au besoin 比较DB密码和请求密码，使用auth.service
            //如果需要，返回代码403

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
            // 使用auth.service生成用户的令牌

            //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
            // 以json格式返回用户的连接信息（见UserConnection接口）。

            res.json();
        });
        
        // -> /api/v1/auth/signup
        router.post('/signup',async (req:Request, res: Response) => {
            const auth: Authentification = req.body;

            //TODO Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent验证用户（用户名）是否已经在数据库中。
            //如果已经存在，则返回一个405代码

            //TODO Chiffrer le mot de passe avec auth.service 用auth.service加密密码

            //TODO Ajouter l'utilisateur à la BD 将用户添加到数据库中
            //Retounez un code 500 en cas de problème 在出现问题的情况下返回代码500

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service 使用auth.service生成用户的令牌
            
            //TODO Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
            // 以json格式返回用户的连接信息（见UserConnection接口）。
            res.json();
        });
        
        return router;
    }

}