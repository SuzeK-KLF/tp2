import { injectable } from 'inversify';
import { Collection, MongoClient, WithId } from 'mongodb';
import { User } from '../interfaces';

const url = 'mongodb://127.0.0.1:27017';

@injectable()
/*
* Cette classe s'occupe des communications avec MongoDB
*/
export class MongodbService {

    private _client: MongoClient = new MongoClient(url);
    private _collection: Collection<User>;
    
    constructor(){
        this._client.connect();
        //Collection à utiliser
        this._collection = this._client.db('tp2').collection<User>('users');
    }
    
    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(username: string):Promise<WithId<User> | null>{
        console.error("getUserByUsername")
        
        //TODO Trouver l'utilisateur en fonction de son nom d'utilisateur
        // 通过用户名查找用户
        const user = await this._collection.find({}).toArray();
        console.log(user[0])
        
        //TODO Retourner l'utilisateur avec son _id
        // 返回用户与它的_id
        throw new Error('Not implemented method');
    }
    
    //Fait la création d'un utilisateur dans la base de données
    async createUser(user: User): Promise<WithId<User> | null>{
        console.error("createUser")
        throw new Error('Not implemented method');
        //TODO Créer un utilisateur en fonction des information d'authentification
        //Utilisez l'interface User根据认证信息创建一个用户
        //使用用户接口

        //TODO Retourner le user créé avec son _id
        // 返回创建的用户和它的_id
    }

}