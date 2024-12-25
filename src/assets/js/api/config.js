const DEV_API_URL = 'http://106.53.88.197:10088';
const PROD_API_URL = 'https://project-api.coderjiang.com/green-chitian/java-api';

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;