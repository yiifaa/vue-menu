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
        //拷贝新值
        /****/
        let copyVal = []
        value.forEach((val) => {
            let copy = Object.assign({}, val)
            copyVal.push(copy)
        })
        Object.assign(this, {
            get copy() {
                return copyVal
            }
        })
        //定义缓存数据
        Object.defineProperty(this, "cache", {
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
        return this.cache.filter((item) => {
            return item.parent === id
        })
    },

    findItem (id) {
       for(let i = 0, len = this.cache.length; i < len; i++) {
           if(id == this.cache[i].id) {
               return this.cache[i]
           }
       }
       return false
    },

    /**
     * 根据id查找访问路径
     */
    findVisitPath (id) {
        let visit = id,
            path  = []
        while(visit !== "#") {
            let item = this.findItem(visit)
            if(item !== false) {
                path.unshift(item)
                visit = item.parent
            } else {
                break
            }
        }
        return path
    },

    /**
     * 拷贝新值
     */
    cloneChildren (id) {
        let copyVal = []
        this.copy.forEach((item) => {
            if(item.parent === id) {
                let copy = Object.assign({}, item)
                copyVal.push(copy)
            }
        })
        return copyVal
    },

    /**
     * 获取所有的APP菜单
     */
    findRootChildren () {
        return this.findChildren("#")
    }

}
export default store
