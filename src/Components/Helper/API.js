import axios from 'axios'

const URL = axios.create({baseURL: 'http://localhost:5000'});
export default URL;