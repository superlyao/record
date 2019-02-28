/**
 * 观察者模式
 */
// 所有观察者
const queuedObservers = new Set()

// 添加观察者
const observe = fn => queuedObservers.add(fn)
const observable = obj => new Proxy(obj, handel)

const handel = {
    set(target, key, value, receiver) {
        // 对目标对象进行赋值
        if (key in target) {
            const result = Reflect.set(target, key, value, receiver)
            if (result) {
                // 通知观察者
                queuedObservers.forEach(fn => fn())
            }
            return result
        } else {
            throw new Error(`不能对未存在的属性赋值=> ${key}`)
        }

    }
}

// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }

const person = observable({
    name: '张三',
    age: 20
  });
  
  function print() {
    console.log(`${person.name}, ${person.age}`)
  }
  
  observe(print);
  person.name = '李四';
  console.log(person)