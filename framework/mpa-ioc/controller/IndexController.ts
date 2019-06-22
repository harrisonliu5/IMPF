import { TYPE, Router, controller, interfaces, inject, httpGet, provideController} from '../ioc/ioc';
import TAGS from '../constant/tags';
import { Model } from '../model/User';

@controller("/")
@provideController(TYPE.Controller,"IndexController")
export default class IndexController implements interfaces.Controller{
    private indexService;
    constructor(@inject(TAGS.IndexService) indexService){
        this.indexService = indexService;
    }
    @httpGet("/")
    private async indexAction(ctx: Router.IRouterContext,next: ()=>Promise<any>){
        const result : Model.User = this.indexService.getUser(1);
        ctx.body = await ctx.render("index",{data: result});
    }
}