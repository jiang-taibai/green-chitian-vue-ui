const DEV_API_URL = 'http://111.230.80.160:18088/';
const PROD_API_URL = 'https://project-api.coderjiang.com/green-chitian/java-api';

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;