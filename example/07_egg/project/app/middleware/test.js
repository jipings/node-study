
module.exports = () => {
    return async (ctx, next) => {
        await next()
    }
}