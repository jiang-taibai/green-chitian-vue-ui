import {getConfig} from "@/assets/js/public/config-center.js";

const DEV_API_URL = 'http://121.4.117.66:38088';
const PROD_API_URL = getConfig().apiBaseUrl;

export const API_URL = import.meta.env.PROD ? PROD_API_URL : DEV_API_URL;