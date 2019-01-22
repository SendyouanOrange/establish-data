import Service from "./service"

class establishService extends Service {
    /**
     * 获取列表数据
     * @param {*} payload 
     * @param {*} callback 
     */
    static getListData(payload, callback) {
        let url = "/establish/enterprise?";
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
        let url = '/establish/enterprise/statistics';
        super.get(url, callback);
    }
    
    /**
     * 获取不分页数据
     * @param {*} callback 
     */
    static getAllData(callback) {
        let url = '/establish/enterprise/list';
        super.get(url, callback);
    }

    /**
     * 根据开办类别获取统计信息
     * @param {*} type 
     * @param {*} callback 
     */
    static getChartDataByType(type,callback){
        let url = '/establish/enterprise/type?type='+type;
        super.get(url,callback);
    }
}
export default establishService;