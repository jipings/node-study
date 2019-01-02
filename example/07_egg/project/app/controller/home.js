
const Controller = require('../../../yadan').Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render('index.tpl');
    }
};

module.exports = HomeController;