// Testing Asynchronous Code
// 在JavaScript中执行异步代码是很常见的。 当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。 Jest有若干方法处理这种情况。

// 回调

// 例如，假设您有一个 fetchData(callback) 函数，获取一些数据并在完成时调用 callback(data)。 你想要测试这返回的数据是只是字符串 'peanut butter'。
// 默认情况下，一旦到达运行上下文底部，jest测试立即结束。这样意味着这个测试将不能按预期工作。

// Don't do this!
const fetch = (callback) => {
    // callback('peanut butter');
}
test('the data is peanut butter', () => {
  function callback(data) {
      expect(data).toBe('peanut butter');
  }

  fetch(callback);
})

// 问题在于一旦fetchData执行结束，此测试就在没有调用回调函数前结束。

// 还有另一种形式的 test，解决此问题。 使用单个参数调用 done，而不是将测试放在一个空参数的函数。 Jest会等done回调函数执行结束后，结束测试。

// test('the data is peanut butter2', done => {
//     function callback2(data) {
//       expect(data).toBe('peanut butter');
//       done();
//     }
  
//     fetch(callback2);
//   });

// Promises

// 如果您的代码使用 Promises，还有一个更简单的方法来处理异步测试。 只需要从您的测试返回一个 Promise, Jest 会等待这一 Promise 来解决。 如果承诺被拒绝，则测试将自动失败。
// 举个例子，比方说，fetchData，使用 Promise 代替回调的话，返回值是应该解析为字符串 'peanut butter' 的 Promise 。我们可以使用下面的测试代码︰

test('the promise data is peanut butter', () => {
    expect.assertions(1);
     new Promise((resolve) => resolve(1)).then(data => {
        expect(data).toBe('peanut butter');
    })
});

// 一定要返回 Promise - 如果你省略 return 语句，您的测试将在 fetchData 完成之前完成。

// 如果你想要 Promise 被拒绝，使用 .catch 方法。 请确保添加 expect.assertions 来验证一定数量的断言被调用。 否则一个fulfilled态的 Promise 不会让测试失败︰

test('the promise fails with an error', () => {
    expect.assertions(1);
    return new Promise((resolve, reject) => {
        return reject('error')
    }).catch(e => {
        // console.log(e);
        expect(e).toMatch('error');
    })
});

// .resolves / .rejects
// 仅用于jest 20.0.0+ #
// 您还可以使用 .resolves 匹配器在您期望的声明，Jest 会等待这一 Promise 来解决。如果 Promise 被拒绝，则测试将自动失败。

test('the promise resolves is peanut butter', () => {
    expect.assertions(1);
    return expect(
            new Promise((resolve, reject) => {
                return resolve('peanut butter');
            })
        ).resolves.toBe('peanut butter');
});

// 一定要返回承诺 - 如果你省略 return 语句，您的测试将在 fetchData 完成之前完成。

// 如果你想要 Promise 被拒绝，使用 .catch 方法。 它参照工程 .resolves 匹配器。 如果 Promise 被拒绝，则测试将自动失败。

test('the promise reject is peanut butter', () => {
    expect.assertions(1);
    return expect(
            new Promise((resolve, reject) => {
                return reject('error');
            })
        ).rejects.toMatch('error');
});


// Async/Await 

// 或者，您可以在测试中使用 async 和 await。 若要编写 async 测试，只要在函数前面使用 async 关键字传递到 test。 例如，可以用来测试相同的 fetchData 方案︰

test('the data is async peanut butter', async () => {
    expect.assertions(1);
    const data = await Promise.resolve('peanut butter');
    expect(data).toBe('peanut butter')
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await Promise.reject('error');
    } catch(e) {
        expect(e).toMatch('error');
    }
});

// 当然，你可以结合 async 和 await .resolves 或 .rejects （在 Jest 20.0.0+ 中可用）。

test('the data is await resolves', async () => {
    expect.assertions(1);
    await expect(Promise.resolve('peanut butter')).resolves.toBe('peanut butter');
});

test('the data is await reject', async () => {
    expect.assertions(2);
    await expect(Promise.reject('error')).rejects.toMatch('error');
    await expect(Promise.resolve('peanut butter')).resolves.toBe('peanut butter');    
});







// 在这些情况下，async 和 await 仅仅只是语法糖，其本身的逻辑与上述使用 Promise 的示例等效。
