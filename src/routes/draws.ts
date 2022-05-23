import { methodNotAllowed, notImplemented } from "boom";
import * as compose from "koa-compose";
import * as Router from "koa-router";
import {
  getDraws,
  createDraw,
  updateDraw,
  deleteDraw,
  getUserDraws,
  getUserDrawsById,
  getDrawsByStatus,
} from "../controller/draws";

const router = new Router({
  prefix: "/api/v1/draws",
});

// create add edit delete routes
router.get("/", getDraws);
router.post("/", createDraw);
router.put("/:id", updateDraw);
router.delete("/:id", deleteDraw);

router.get("/status/:status", getDrawsByStatus);
// get user draws
// get all user draws
router.get("/mine", getUserDraws);
router.get("/mine/:id", getUserDrawsById);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
