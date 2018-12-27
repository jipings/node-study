
const http = require('http');
const URL = require('url');

module.exports = class Tiny {
    constructor(){
        this.middlewares = [];

        // 注册语法糖， app.get() /app.post()...
        for(const method of ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH']) {
            this[method.toLowerCase()] = (pattern, fn) => {
                this.middlewares.push({method, pattern, fn});
                return this;
            }
        };
    }

    // 挂载中间件
    use(pattern, fn) {
        // console.log(pattern, fn)
        if(fn === undefined && typeof pattern === 'function') {
            fn = pattern;
            pattern = undefined;
        };
        // 保存
        this.middlewares.push({ pattern, fn });
        return this;
    };

    // 允许自定义错误处理
    onError(fn) {
        this.errorHanlder = fn;
    }

    // 路由匹配
    _match(req, rule) {
        const {pattern, method} = rule;
        if(method && method !== req.method) return false;
        if(!pattern) return true;

        const {pathname} = req;

        if(typeof pattern === 'string') {
            return pathname === pattern;
        } else if (pattern instanceof RegExp) {
            // 正则表达式
            const match = pathname.match(pattern);
            if(!match) return false;

            // 匹配的分组结果存入 req.params
            req.params = match.slice(1);
            return true;
        }
    }

    _patch(req, res) {
        const urlObj = URL.parse(req.url, true);
        req.pathname = urlObj.pathname;
        req.query = urlObj.query;

        // res
        res.json = data => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data, null, 2));
            return this;
        };

        res.status = code => {
            res.statusCode = code;
            return this;
        };
    };

    // 处理函数
    handler(req, res) {
        this._patch(req, res);
        let i = 0;
        const next = err => {
            if(err) return this.handlerError(err, req,res);
            const rule = this.middlewares[i++];
            if(!rule) return;
            if(!this._match(req,rule)) return next();
            rule.fn(req, res, next);
        };
        next();
    }

    // 错误处理
    handlerError(err, req, res) {
        if(this.errorHanlder) return this.errorHanlder(err, req, res);

        // 默认的错误处理
        res.statusCode = err.status || 500;
        res.statusMessage = err.message;
        res.setHeader('Content-Type', 'text/html');
        res.end(err.message);
    };

    // 启动服务
    listen(port, callback) {
        this.server = http.createServer(this.handler.bind(this));
        this.server.listen(port, callback);
    }
}