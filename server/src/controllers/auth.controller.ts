import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserConnection } from '../../../common/userConnection';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';
import { Collection, MongoClient, WithId } from 'mongodb';

@injectable()
export class AuthController {
    public constructor(
        @inject(TYPES.AuthService) private _authService: AuthService,
        @inject(TYPES.MongodbService) private _mongodbService: MongodbService) {
        //empty
    }

    public get router(): Router {

        const router: Router = Router();

        // -> /api/v1/auth/login
        router.post('/login', async (req: Request, res: Response) => {
            const auth: Authentification = req.body;

            //Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403 
            const user: WithId<User> | null = await this._mongodbService.getUserByUsername(auth.username)
            if (!user) {
                res.sendStatus(403)
            } else {
                //Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
                //Retournez le code 403 au besoin
                try {
                    const result: boolean = await this._authService.isPasswordValid(auth.password, user.hash);
                    if (result) {
                        //Générer le jeton de l'utilisateur à l'aide du service auth.service
                        const token: string = this._authService.generateToken(user._id.toString());
                        const userConnection: UserConnection = {
                            id: user._id,
                            token: token,
                            username: user.username
                        };
                        //Retourner les informations de connexion de l'utilisateur (voir interface UserConnection) sous format json 
                        console.log(userConnection);
                        res.json(userConnection);
                    } else {
                        console.error("Your username or password don't match! ")
                        res.sendStatus(403);
                    }
                }
                catch (err) {
                    console.error("Encrypt Password error! " + err.message);
                    res.sendStatus(403);
                }
            }
        });

        // -> /api/v1/auth/signup
        router.post('/signup', async (req: Request, res: Response) => {
            const auth: Authentification = req.body;
            //Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent
            const user: WithId<User> | null = await this._mongodbService.getUserByUsername(auth.username)
            if (user) {
                console.error("Usename already exists!");
                res.sendStatus(405)
            } else {
                //Chiffrer le mot de passe avec auth.service
                const hash: string = await this._authService.encryptPassword(auth.password);
                //Ajouter l'utilisateur à la BD 
                //Retounez un code 500 en cas de problème 
                try {
                    const newUser: User = { 
                        username: auth.username,
                        hash: hash
                    }
                    const addUser: WithId<User> | null = await this._mongodbService.createUser(newUser)
                    //Générer le jeton de l'utilisateur à l'aide du service auth.service 
                    if(addUser!==null){
                        const token: string = this._authService.generateToken(addUser._id.toString());
                        const userConnection: UserConnection = {
                            id: addUser._id,
                            token: token,
                            username: addUser.username
                        };
                        res.json(userConnection);
                    }else{
                        console.error("Create user error!")
                    }    
                }
                catch (err) {
                    console.error("Sign up failed!" + err.message)
                    res.sendStatus(500);
                }
            }
        });

        return router;
    }

}