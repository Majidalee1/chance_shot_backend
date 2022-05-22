// create draw entries routes with compose and koa router
import * as Router from "koa-router";
import { methodNotAllowed, notImplemented } from "boom";
import { getWinnerEntryByDrawId } from "../controller/draw-entries";
import compose = require("koa-compose");
import {
  getDrawEntries,
  createDrawEntries,
  chooseWinnerDrawEntries,
} from "../controller/draw-entries";

const router = new Router({
  prefix: "/api/v1/draw-entries",
});

// add draw entries routes
router.get("/:id", getDrawEntries);
router.post("/", createDrawEntries);

// choose winner draw entries routes
router.put("/", chooseWinnerDrawEntries);
// // get winner draw entries routes
// router.get("/winners", getWinnerDrawEntries);
// //get draw winner entries
router.get("/winner/:id", getWinnerEntryByDrawId);

// compose routes
const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => compose([routes, allowedMethods]);
