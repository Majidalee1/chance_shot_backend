import { Payload } from "boom";
import { IDraw } from "../models/draws";
import {
  createDrawSchema,
  updateDrawSchema,
} from "../schema/validations/draws";
import * as drawRepo from "../repositories/draws";
// create draws
// update draws

export const getDraws = async () => {
  const draws = await drawRepo.getDraws();
  return draws;
};

export const createDraw = async (payload: IDraw) => {
  payload = await createDrawSchema.validateAsync(payload);

  return drawRepo.createDraw(payload);
};

// update draws
export const updateDraw = async (payload: IDraw, id: number) => {
  payload = await updateDrawSchema.validateAsync(payload);

  const infoUpdate = payload.drawInfo;
  delete payload.drawInfo;

  // remove all empty or null values from payload
  Object.keys(payload).forEach((key: keyof typeof payload) => {
    if (!payload[key]) {
      delete payload[key];
    }
  });

  infoUpdate &&
    Object.keys(infoUpdate).forEach((key: keyof typeof infoUpdate) => {
      if (!infoUpdate[key]) {
        delete infoUpdate[key];
      }
    });

  infoUpdate && (await drawRepo.updateDrawInfo(infoUpdate, id));
  return drawRepo.updateDraw(payload, id);
};

// getDrawsByStatus;
export const getDrawsByStatus = async (status: string) => {
  const draws = await drawRepo.getDrawsByStatus(status);
  return draws;
};
