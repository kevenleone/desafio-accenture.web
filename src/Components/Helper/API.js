import axios from 'axios'
const URL_PROD = 'https://desafio-accenture-k.herokuapp.com'
const URL_DEV = 'http://localhost:5000'

const URL = axios.create({baseURL: URL_DEV});
export default URL;