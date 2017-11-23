// amd 规范是CommonJS 模块规范的一个延伸，它的模块定义如下
// define(id?, dependencies? factory);

define(function() {
    var exports = {};
    exports.sayHello = function() {
        console.log('Hello from module:'+module.id);
    }
    return exports;
})