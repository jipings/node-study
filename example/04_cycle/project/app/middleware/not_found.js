'use strict';

module.exports = () => {
  return async (ctx, next) => {
    await next();

    // Node 默认的 status 为 200，故这里判断 body 为空的时候，为没处理。
    if (ctx.body === undefined && ctx.status === 200) {
      ctx.throw(404, 'Not Found');
    }
  };
};
