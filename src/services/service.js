import Axios from "axios";

const axios = Axios.create();

// // 配置Axios
// axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response.status === 401) { //如果提示401，没有授权
//             var url = window.location.href.split('#')[0] + "#/login";
//             window.location.href = url;
//             window.location.reload();
//         } else {
//             return Promise.reject(error);
//         }
//     }
// );

/**
 * 服务基类
 */
class Service {

    /**
     * HTTP GET
     * @param {*} url   URL 
     * @param {*} callback  回调函数
     */
    static get(url, callback) {
        axios.get(url).then(res => {
            callback && callback(res.data);
        });
    }

    /**
     * HTTP DELETE
     * @param {*} url   URL 
     * @param {*} callback  回调函数
     */
    static delete(url, callback) {
        axios.delete(url).then(res => {
            callback && callback(res.data);
        });
    }

    /**
     * HTTP POST
     * @param {*} url   URL 
     * @param {*} payload    POST body 
     * @param {*} callback   回调函数
     */
    static post(url, payload, callback) {
        axios.post(url, payload).then(res => {
            callback && callback(res.data);
        });
    }

    /**
     * HTTP PUT
     * @param {*} url       URL
     * @param {*} payload  JSON 实体
     * @param {*} callback 回调函数
     */
    static put(url, payload, callback) {
        axios.put(url, payload).then(res => {
            callback && callback(res.data);
        });
    }

    /**
     * HTTP 上传文件
     * @param url URL
     * @param file 文件
     * @param callback 回调函数
     */
    static upload(url, file, callback) {
        // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        axios.post(url, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.cookie('jwt')
            }
        }).then((res) => {
            callback(res.data);
        });
    }

    /**
     * 设置全局授权
     * @param {*} token
     */
    static setAuth(token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    /**
     *写入或者读取cookie
     *
     * @static
     * @param {*} key
     * @param {*} val
     * @memberof Service
     */
    static cookie(key, val) {
        if (val) {
            this.setCookie(key, val, 2);
        } else {
            return this.getCookie(key);
        }
    }


    /**
     * 设置cookie
     * @param {*} key  
     * @param {*} val 
     * @param {*} day 
     */
    static setCookie(key, val, day) {
        var expires;
        var d = new Date();

        day = day ? day : 2;
        d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
        expires = "expires=" + d.toGMTString();
        //escape
        document.cookie = key + "=" + escape(val) + "; " + expires + ";path=/";
    }

    /**
     * 读取cookie
     * @param {*} key 
     */
    static getCookie(key) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            //unescape
            if (temp[0] == key) return (temp[1]);
        }
        return "";
    }
}

export default Service;