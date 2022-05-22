// getDrawEntries

import * as Boom from "boom";
import { IDrawEntry } from "../models/draw-entries";
import * as drawEntryRepo from "../repositories/draw-entries";
import * as drawRepo from "../repositories/draws";
import { Models } from "../models/index";
import {
  decrementTicketsAvaliable,
  getDrawByParams,
} from "../repositories/draws";
import users from "../models/users";
export const getDrawEntries = async (
  drawId: number,
  skip: number,
  limitNumber: number
) => {
  const drawEntries = await drawEntryRepo.getDrawEntriesByParams(
    { id: drawId },
    {
      offset: skip,
      limit: limitNumber,
      order: [["createdAt", "DESC"]],
    }
  );
  return drawEntries;
};

// createDrawEntries;
export const createDrawEntries = async (payload: IDrawEntry) => {
  const drawEntries = [] as IDrawEntry[];
  const draw = await getDrawByParams({ id: payload.drawId });

  if (!draw) {
    throw Boom.badRequest("Invalid.draw.id");
  }

  if (draw.dataValues.ticketsAvaliable < payload.entriesCount!)
    throw Boom.badRequest("Invalid.entries.count");

  await decrementTicketsAvaliable(draw.dataValues.id, payload.entriesCount);

  const drawCode = draw?.dataValues?.drawCode || "DRW";
  const drawEntriesCount = await drawEntryRepo.countDrawEntries({
    drawId: payload.drawId,
  });

  const entriesCount = payload.entriesCount || 0;

  // ADD MULTIPLE ENTRIES FOR SAME DRAW WITH CODE INCREMENT
  for (let i = 0; i < entriesCount; i++) {
    const entryCode = `${drawCode}${drawEntriesCount + i + 1}`;
    drawEntries.push({
      userId: payload.userId,
      drawId: payload.drawId,
      entryCode,
      entryStatus: "active",
    });
  }
  return drawEntryRepo.createDrawEntries(drawEntries);
};

// chooseWinnerDrawEntries;
export const chooseWinnerDrawEntries = async (payload: {
  drawId: number;
  winnerEntry: number | string;
}) => {
  const draw = await drawRepo.getDrawByParams({ id: payload.drawId });
  if (!draw) {
    throw Boom.badRequest("Invalid.draw.id");
  }

  // check if payload.winnerEntry is a number or string
  if (typeof payload.winnerEntry === "number") {
    payload.winnerEntry = `${draw.dataValues.drawCode}${payload.winnerEntry}`;
  }

  const winnerEntry = await drawEntryRepo.getDrawEntryByParams({
    drawId: payload.drawId,
    entryCode: payload.winnerEntry,
  });

  if (!winnerEntry) {
    throw Boom.badRequest("Invalid.winner.entry");
  }

  if (winnerEntry.entryStatus !== "active") {
    throw Boom.badRequest("Choosen entry is not active. Please try again");
  }

  // update updateDraw
  await drawRepo.updateDraw(
    {
      winnerEntryId: `${winnerEntry.id}`,
      status: "completed",
    },
    payload.drawId
  );

  return await getWinnerEntryInfo(draw.dataValues.id);
};

export const getWinnerEntryInfo = async (drawId: number) => {
  const draw = await drawRepo.getDrawByParams({ id: drawId });
  if (!draw) {
    throw Boom.badRequest("Invalid.draw.id");
  }
  if (draw.dataValues.winnerEntryId === null) {
    throw Boom.badRequest("No winner entry found");
  }

  const winnerEntry = await drawEntryRepo.getDrawEntryByParams(
    {
      id: draw.dataValues.winnerEntryId,
    },
    {
      include: [
        {
          model: Models.user,
          as: "user",
          attributes: ["firstName", "lastName", "email", "phone", "address"],
        },
        {
          model: Models.draw,
          as: "draw",
        },
      ],
    }
  );

  if (!winnerEntry) {
    throw Boom.badRequest("Invalid.winner.entry");
  }

  return winnerEntry;
};
