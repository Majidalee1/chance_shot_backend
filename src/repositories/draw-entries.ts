import { Models } from "../models";
import { IDrawEntry } from "../models/draw-entries";

const drawEntries = Models.drawEntries;

// getDrawEntryByParams;
export const getDrawEntriesByParams = async (
  where: {
    [key: string]: any;
  },
  // params will be object with key value pairs
  options: {
    [key: string]: any;
  } = {}
) =>
  drawEntries.findAll({
    where,
    ...options,
  });

export const getDrawEntryByParams = async (
  where: {
    [key: string]: any;
  },
  // params will be object with key value pairs
  options: {
    [key: string]: any;
  } = {}
) =>
  drawEntries.find({
    where,
    ...options,
  });

//   countDrawEntries;
export const countDrawEntries = async (where: { [key: string]: any }) =>
  drawEntries.count({
    where,
  });

//   createDrawEntries;
export const createDrawEntry = async (payload: { [key: string]: any }) =>
  drawEntries.create(payload);

export const createDrawEntries = async (payload: IDrawEntry[]) =>
  drawEntries.bulkCreate(payload);

//   updateDrawEntries;
export const updateDrawEntries = async (
  where: {
    [key: string]: any;
  },
  payload: {
    [key: string]: any;
  }
) =>
  drawEntries.update(payload, {
    where,
  });

//   deleteDrawEntries;
export const deleteDrawEntries = async (where: { [key: string]: any }) =>
  drawEntries.destroy({
    where,
  });
