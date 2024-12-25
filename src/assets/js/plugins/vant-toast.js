import {showFailToast, showSuccessToast, showLoadingToast, showToast, closeToast} from "vant";
// 当配置了按需引入时，如果显式地引入了 Vant 的样式文件，就必须要手动引入样式文件
// 参考：https://vant-ui.github.io/vant/#/zh-CN/toast#an-xu-yin-ru-zu-jian-shi-shi-yong-showtoast-shi-chu-xian-yang-shi-yi-chang-wen-ti
import 'vant/lib/toast/style';
// 此时还需要手动引入基本的样式文件
import 'vant/lib/index.css';

export {
    showFailToast,
    showSuccessToast,
    showLoadingToast,
    showToast,
    closeToast
};
