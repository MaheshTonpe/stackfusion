import axios from "axios";
import { User } from "../schema/user";

interface UserAPIList{
    getUserList(): Promise<User[]>;
    addUser(user: User): Promise<User>;
    editUser(user: User): Promise<void>;
    getUser(id: number): Promise<User>;
    deleteUser(id: number): Promise<void>;
}

class UserAPI implements UserAPIList{
    BASE_URL = process.env.REACT_APP_ENDPOINT

    getUserList(): Promise<User[]> {
        return axios.get(`${this.BASE_URL}/api/user/list/`).then(res => res.data as Promise<User[]>)
    }

    addUser(user: User): Promise<User> {
        return axios.post(`${this.BASE_URL}/api/user/list/`, user).then(res => res.data as Promise<User>);
    }

    editUser(user: User): Promise<void> {
        return axios.put(`${this.BASE_URL}/api/user/${user.id}/`, user);
    }
    
    getUser(id: number): Promise<User> {
        return axios.get(`${this.BASE_URL}/api/user/${id}/`).then(res => res.data as Promise<User>);
    }
    
    deleteUser(id: number): Promise<void> {
        return axios.delete(`${this.BASE_URL}/api/user/${id}/`);
    }
}

function getUserAPI(){
    return new UserAPI()
}

export default getUserAPI;