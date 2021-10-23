import { methodNotAllowed, notImplemented } from "boom";
import * as compose from "koa-compose";
import * as Router from "koa-router";
import { insertUser, loginUser } from "../controller/auth";

const router = new Router({
  prefix: "/api/v1/auth",
});

router.post("/login", loginUser);
router.post("/signup", insertUser);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
