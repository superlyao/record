/**
 * 按顺序完成异步操作
 * 依次远程读取一组 URL，然后按照读取的顺序输出结果。
 * 
 * 虽然map方法的参数是async函数，但它是并发执行的，
 * 因为只有async函数内部是继发执行，外部不受影响。
 * 后面的for..of循环内部使用了await，因此实现了按顺序输出。
 */
// async function logInOrder(urls) {
//     // 并发读取远程URL
//     const textPromises = urls.map(async url => {
//       const response = await fetch(url);
//       return response.text();
//     });
  
//     // 按次序输出
//     for (const textPromise of textPromises) {
//       console.log(await textPromise);
//     }
//   }

/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
  return new Promise(resolve => {
      setTimeout(() => resolve(n + 200), n);
  });
}

function step1() {
  console.log(`step1 with 1`);
  return takeLongTime(1000);
}

function step2() {
  console.log(`step2 with 2`);
  return takeLongTime(1000);
}

function step3() {
  console.log(`step3 with 3`);
  return takeLongTime(1000);
}

let promises = [step1, step2, step3];

async function todo() {
  /**
   * 并发执行
   */
    const result = promises.map(async step => {
      const temp = await step()
      return temp
    })
    
    for(const text of result) {
      console.log(await text)
    }
    let result1 = await Promise.all(promises)
    console.log(result1)
    
    /**
     * 串行执行
     */
    // let s1 = await step1()
    // let s2 = await step2()
    // let s3 = await step3()
    
    // console.log(s1)
    // console.log(s2)
    // console.log(s3)
}

todo()