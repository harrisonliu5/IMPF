import { IIndex } from '../interface/IIndex';
import { Model } from '../model/User';
import TAGS from '../constant/tags';
import { provide } from "../ioc/ioc";

@provide(TAGS.IndexService)
export class IndexService implements IIndex{
    private userStorage: Model.User[] = [
        {
            email: "dddddd",
            name: 'sadsdsad'
        }
    ];
    public getUser(id:string):Model.User{
        let result :Model.User;
        result = this.userStorage[id];
        return result;
    }
}

