/**
 * Created by ganhuan on 2016/4/20.
 */
import relation from "./menus/relation"
import simple   from "./menus/simple"
import asyn     from "./menus/async"

export default {

    /**
     * 将所有的菜单按顺序注册
     */
    data  : [simple, asyn, relation],

    /**
     * 将菜单对象转换为数组
     */
    concat () {
        let result = [];
        this.data.forEach((item) => {
            result = result.concat(item)
        })
        return result
    },

    /**
     * 获取所有的菜单
     */
    get () {
        return this.concat()
    }

}