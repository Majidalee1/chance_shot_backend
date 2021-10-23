// import * as debug from "debug";
import * as Koa from "koa";
import * as loggerMiddleware from "koa-bunyan-logger";
import * as jsonMiddleware from "koa-json";
import conf from "./conf";
import errorMiddleware from "./middleware/error";
import requestMiddleware from "./middleware/request";
import routeMiddleware from "./route";

import koaBody = require("koa-body");

const app = new Koa();
// const d = debug("kickstarter:root");

// Register middleware
app.use(jsonMiddleware());
app.use(loggerMiddleware());
app.use(requestMiddleware());
app.use(errorMiddleware());
app.use(koaBody());

// Registers routes via middleware
app.use(routeMiddleware());

console.log("current environment: %s", conf.get("env"));
console.log("server started at port: %d", conf.get("port"));
// Database.sync({ force: true });
// db.sequelize.sync({ force: true });
app.listen(4000);
