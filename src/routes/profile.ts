import { methodNotAllowed, notImplemented } from "boom";
import * as compose from "koa-compose";
import * as Router from "koa-router";

import * as profile from "../controller/profile";
import { authMiddleware } from "../middleware/auth";

const router = new Router({
  prefix: "/api/v1/profile",
});
router.use(authMiddleware);

router.get("/", profile.getProfile);

// edit profile
router.put("/", profile.editProfile);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
