import * as compose from "koa-compose";
import * as Router from "koa-router";
// Import all routes

import auth from "./auth";
import profile from "./profile";

export default () => compose([auth(), profile()]);
