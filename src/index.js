import Koa from 'koa';
import Router from 'koa-router';
import staticServer from 'koa-static';
import bodyParser from 'koa-bodyparser';
import middleware from './middleware';
import controller from './controller';
import config from './config/index';
import router from './route';
import consoleNote from './utils/consoleNote';
// 路由实例
const routerForAllow = new Router();
// 创建服务实例
const app = new Koa();

//options 请求处理，全部给200,考虑放 validateToken 中间件里面
//自动化测试的时候，或者在跨域情况下，会先options请求
app.use(async (ctx,next) => {
    if(ctx.request.method==="OPTIONS"){
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Cache-Control', 'no-cache');
        consoleNote(JSON.stringify(ctx));
    }else {
        await next();
    }
});
// 使用babel编译之后，输出的是跟路径，/
console.log(__dirname);
// 输出绝对路径
console.log(process.cwd());
// 默认的静态文件
app.use(staticServer("." + __dirname + "dist/static"));
// 上传的图片
app.use(staticServer("." + __dirname + "publicImg"));
// 排除某些接口,不校验
app.use(middleware.koaJwtConfig());
// 上传图片
app.use(middleware.uploaderConfig());
// swagger 文档
app.use(middleware.swaggerConfig());
// token错误校验必须在 koaJwt 之后
app.use(middleware.validateToken());
// 模板引擎配置
app.use(middleware.viewsConfig());
// 日志处理
app.use(middleware.logNote());
// 请求体处理
app.use(bodyParser());
// 统一错误处理
app.on('error', middleware.errorDel());
// 使用路由中间件
app.use(controller.initController.initController)
    .use(router.userPermissionModuleRouter.router.routes())
    .use(router.blogBackModuleRouter.router.routes())
    .use(router.blogFrontModuleRouter.router.routes())
    .use(routerForAllow.allowedMethods());
//监听端口
app.listen(config.port);
console.log("监听端口：" + config.port);

exports.app = app;
// let nodeBlog = require("./dist/index.js");
// let nodeBlog = require("node-blog");
// nodeBlog.app.listen(confg);
