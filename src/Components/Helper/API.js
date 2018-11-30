import axios from 'axios'

const URLS = {
    PROD: 'https://desafio-accenture-k.herokuapp.com',
    DEV: 'http://localhost:5000'
}

// OBS, o endereço de prod está funcionando

const URL = axios.create({baseURL: URLS.DEV});
export default URL;