// router.get("/:id", getDrawEntries);
// router.post("/", createDrawEntries);

// // choose winner draw entries routes
// router.put("/:id", chooseWinnerDrawEntries);
// // get winner draw entries routes
// router.get("/winners", getWinnerDrawEntries);
// //get draw winner entries
// router.get("/:id", getWinnerEntryByDrawId);

// implement the routes

import * as drawEntryService from "../services/draw-entries";
import { Context } from "koa";
import { IDrawEntry } from "../models/draw-entries";

export const getDrawEntries = async (ctx: Context, next: () => void) => {
  const { id: drawId }: { id: number } = ctx.params;
  const { page = 1, limit = 10 }: Record<string, any> = ctx.query;
  const pageNumber = +page;
  const limitNumber = +limit;
  const skip = (pageNumber - 1) * limitNumber;
  ctx.state.data = await drawEntryService.getDrawEntries(
    drawId,
    skip,
    limitNumber
  );
  next();
};

// create draw entries
export const createDrawEntries = async (ctx: Context, next: () => void) => {
  const payload: IDrawEntry = {
    userId: ctx.request.body.userId,
    drawId: ctx.request.body.drawId,
    entriesCount: ctx.request.body.entriesCount || 1,
  };
  ctx.state.data = await drawEntryService.createDrawEntries(payload);
  next();
};

// chooseWinnerDrawEntries
export const chooseWinnerDrawEntries = async (
  ctx: Context,
  next: () => void
) => {
  const payload = {
    drawId: ctx.request.body.drawId,
    winnerEntry: ctx.request.body.winnerEntry,
  };
  ctx.state.data = await drawEntryService.chooseWinnerDrawEntries(payload);
  next();
};

// getWinnerEntryByDrawId;
export const getWinnerEntryByDrawId = async (
  ctx: Context,
  next: () => void
) => {
  const { id: drawId }: { id: number } = ctx.params;
  ctx.state.data = await drawEntryService.getWinnerEntryInfo(drawId);
  next();
};
