import { methodNotAllowed, notImplemented } from "boom";
import * as compose from "koa-compose";
import * as Router from "koa-router";
import * as profile from "../controller/profile";
import { createCategory } from "../controller/draws";

const router = new Router({
  prefix: "/api/v1/admin",
});

router.get("/users", profile.getUsersByAdmin);

router.post("/categories/add", createCategory);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
