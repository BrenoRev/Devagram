import axios from 'axios';

export default class HttpService {
    constructor(){
        this.axios = axios.create({
            baseURL: 'https://devagram-nodejs-next.vervel.app/api',
        });
    }
        post(url, data){
            this.axios.post(url, data);
        }



}