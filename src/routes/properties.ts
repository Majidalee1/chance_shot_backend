import { methodNotAllowed, notImplemented } from "boom";
import * as compose from "koa-compose";
import * as Router from "koa-router";
import * as properties from "../controller/properties";
import { authMiddleware } from "../middleware/auth";

const router = new Router({
  prefix: "/api/v1/properties",
});
router.use(authMiddleware);
router.get("/", properties.getAll);
router.post("/create", properties.create);
router.post("/edit", properties.edit);
// get properties by id
router.get("/:id", authMiddleware, properties.getById);
const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
