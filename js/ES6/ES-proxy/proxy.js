function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        console.log(target)
        console.log(propKey)
        console.log(receiver)
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
          console.log(propKey)
        }
        console.log(Reflect.get(target, propKey, receiver))
        return Reflect.get(target, propKey, receiver);
      }
    };
  
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }

let arr = createArray('a', 'b', 'c')
console.log(arr[-1])

var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function (target, property) {
        // 是否存在该属性
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

proxy.name // "张三"
proxy.age // 抛出一个错误