import * as compose from "koa-compose";
import * as Router from "koa-router";
// Import all routes

import auth from "./auth";
import profile from "./profile";
import draws from "./draws";
export default () => compose([auth(), profile(), draws()]);
