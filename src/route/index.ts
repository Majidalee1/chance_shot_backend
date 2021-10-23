import * as compose from "koa-compose";
import * as Router from "koa-router";
// Import all routes
import user from "./user";
import auth from "./auth";

export default () => compose([user(), auth()]);
