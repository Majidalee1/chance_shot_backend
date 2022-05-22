// import * as debug from "debug";
import * as Koa from "koa";
import * as loggerMiddleware from "koa-bunyan-logger";
import * as jsonMiddleware from "koa-json";
import errorMiddleware from "./middleware/error";
import requestMiddleware from "./middleware/request";
import responseMiddleware from "./middleware/response";
import routeMiddleware from "./routes";
import * as cors from "@koa/cors";
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
app.use(cors({ origin: "*" }));

// Registers routes via middleware
app.use(routeMiddleware());
app.use(responseMiddleware());

// console.log("current environment: %s", conf.get("env"));
// console.log("server started at port: %d", process.env.API_PORT || 4000);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}`));
