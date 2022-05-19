import axios from 'axios';


export default class HttpService {
    constructor(){
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        });
    }

    post(url, data){
        console.log(process.env.NEXT_PUBLIC_API_URL)
        this.axios.post(url, data);
    }



}