// import * as debug from "debug";
import * as Koa from "koa";
import * as loggerMiddleware from "koa-bunyan-logger";
import * as jsonMiddleware from "koa-json";
import conf from "./conf";
import errorMiddleware from "./middleware/error";
import requestMiddleware from "./middleware/request";
import routeMiddleware from "./routes";
import responseMiddleware from "./middleware/response";

import koaBody = require("koa-body");

const app = new Koa();
// const d = debug("kickstarter:root");

// Register middleware
app.use(jsonMiddleware());
app.use(loggerMiddleware());
app.use(requestMiddleware());
// responseMiddleware
app.use(errorMiddleware());
app.use(koaBody());

// Registers routes via middleware
app.use(routeMiddleware());
app.use(responseMiddleware());

console.log("current environment: %s", conf.get("env"));
console.log("server started at port: %d", process.env.API_PORT || 4000);

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`listening on port ${port}`));
