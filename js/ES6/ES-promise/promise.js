// const promise = new Promise((resolve, reject) => {
//     resolve('hello')
//     reject('error')
// })

// promise.then(data => {
//     console.log(data)
// }).catch(error => {
//     console.log(error)
// })

// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done')
//         const img = new Image()
//     })
// }
// timeout(1000).then(data => {
//     console.log(data)
// })

/**
 * promise 实现ajax
 */
const getJson = (url) => {
    const promise = new Promise((resolve, reject) => {
        const handler = function() {
            if (this.readyState !== 4) {
              return;
            }
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error(this.statusText));
            }
          }
        try {
            const client = new XMLHttpRequest()
            client.open('GET', url)
            client.onreadystatechange = handler
            client.responseType = 'JSON'
            client.send()
        } catch (e){
            reject(new Error('连接失败' + e))
        }
        
    })
    return promise
}
// 这种方式访问会造成跨域问题
getJson('http://localhost:8080/test').then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})