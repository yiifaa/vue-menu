/**
 * Created by ganhuan on 2016/4/19.
 */
let store = {

    init (value) {
        if(!value) {
            throw new Error("store can't be null")
        }
        if(!Array.isArray(value)) {
            throw new Error("store must be array");
        }
        Object.defineProperty(this, "value", {
            value         : value,
            writable     : false,
            enumerable   : false,
            configurable : false
        })
    },

    /**
     * 获取所有的儿子节点
     */
    findChildren (id) {
        return this.value.filter((item) => {
            return item.parent === id
        })
    },

    /**
     * 获取所有的APP菜单
     */
    findRootChildren () {
        return this.findChildren("#")
    }

}
export default store
