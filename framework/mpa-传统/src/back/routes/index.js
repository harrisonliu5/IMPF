import IndexController from './IndexController';

const routesInit = {
    init(app, router){
        app.use(router(_ => {
            _.get('/', IndexController.indexAction())
            _.get('/index/test', IndexController.testAction())
        }))
    }
}
export default routesInit;