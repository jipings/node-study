// 为了测试此函数，我们可以使用一个 mock 函数，然后检查 mock 函数的状态来确保回调函数如期调用。

const forEach = require('./forEach');


describe('define mock per test', () => {
    it('uses mocked module', () => {
        const mockCallback = jest.fn();
        
        forEach([0,1], mockCallback);
        
        // 此模拟函数被调用了两次
        
        expect(mockCallback.mock.calls.length).toBe(2);
        
        // 第一次调用函数时的第一个参数是 0
        
        expect(mockCallback.mock.calls[0][0]).toBe(0);
        
        // 第二次调用函数时的第一个参数是 1
        expect( mockCallback.mock.calls[1][0]).toBe(1);

        // 这个函数被实例化两次
        expect(mockCallback.mock.instances.length).toBe(2);

    // 这个函数被第一次实例化返回的对象中，有一个 name 属性，且被设置为了 'test’ 
      // expect(mockCallback.mock.instances[0].name).toEqual('test');
    }); 
});

// .mock 属性

// 所有的 mock 函数都有这个特殊的 .mock属性，它保存了此函数被调用的信息。 .mock 属性还追踪每次调用时 this的值，所以也让检视 this 的值成为可能：

const  myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);

bound();
console.log(myMock.mock.instances);

// 在测试中，需要对函数如何被调用，或者实例化做断言时，这些 mock 成员变量很有帮助意义︰


