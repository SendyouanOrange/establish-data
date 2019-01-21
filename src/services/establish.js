import Service from "./service"

class establishService extends Service {
    /**
     * 获取列表数据
     * @param {*} payload 
     * @param {*} callback 
     */
    static getListData(payload, callback) {
        let url = "/api/enterprise?";
        for (let key in payload) {
            url += `${key}=${payload[key]}&`
        }
        super.get(url, callback)
    }

    /**
     * 获取数据的最大最小值
     * @param {*} callback 
     */
    static getOverviewData(callback) {
        let url = '/api/enterprise/statistics';
        super.get(url, callback);
    }
}
export default establishService;