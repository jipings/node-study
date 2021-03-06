// 兼容多种模块规范
(function(name, definition) {
    // 检测上下文环境是否为 AMD 或 CMD
    var hasDefine = typeof define === 'function',
        // 检测上下文环境是否为 Node
        hasExports = typeof module !== 'undefined' && module.exports;

        if(hasDefine) {
            // AMD环境或CMD环境
            define(definition);
        } else if (hasExports) {
            // 定义为普通Node模块
            module.exports = definition();
        } else {
            // 将模块的执行结果挂载在window变量中，在浏览器中this指向window对象
            this[name] = define();
        }
})('hello', function() {
    var hello = function() {};
    return hello;
})