export default {
  
  /**
   * 遍历树结构数据[{child:[{},{}]}]
   * @param {*} data 
   * @param {*} name 
   * @param {*} func 
   */
  traverseTreeData(data, name, func) {
    for (let i = 0,l = data.length;i < l;i++) {
      let item = data[i];
      if (item[name]) {
        traverseTreeData(item[name], name, func)
      } else {
        func(item)
      }
    }
  }
}
