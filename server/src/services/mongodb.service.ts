import { injectable } from 'inversify';
import { Collection, MongoClient, W, WithId } from 'mongodb';
import { User } from '../interfaces';

const url = 'mongodb://127.0.0.1:27017';

@injectable()
/*
* Cette classe s'occupe des communications avec MongoDB
*/
export class MongodbService {

    private _client: MongoClient = new MongoClient(url);
    private _collection: Collection<User>;

    constructor() {
        this._client.connect();
        //Collection à utiliser
        this._collection = this._client.db('tp2').collection<User>('users');
    }

    //Retourne les informations d'un utilisateur à partir de son username
    async getUserByUsername(username: string): Promise<WithId<User> | null> {
        const user: Promise<WithId<User> | null> = this._collection.findOne({ username: username });
        return user;
    }

    //Fait la création d'un utilisateur dans la base de données
    async createUser(user: User): Promise<WithId<User> | null> {
            this._collection.insertOne({hash: user.hash, username: user.username})
            // Retourner le user créé avec son _id
            const userNew : Promise<WithId<User> | null>= this.getUserByUsername(user.username);
            return userNew;
    }

}