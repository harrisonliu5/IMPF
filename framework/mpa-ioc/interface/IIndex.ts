import { Model } from '../model/User';
export interface IIndex{
    getUser(id:string):Model.User;
}