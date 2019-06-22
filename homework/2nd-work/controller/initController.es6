import IndexController from "./indexController.es6";

const InitController = {
    init(app, router) {
        app.use(router(_ => {
            _.get('/index/index', IndexController.index())
        }))
    },
}

export default InitController;