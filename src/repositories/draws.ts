// create draws
// update draws

import { Models } from "../models";
import { IDraw } from "../models/draws";
import { IDrawInfo } from "../models/draw-Info";

const Draws = Models.draw;
const DrawEntries = Models.drawEntries;
const DrawInfo = Models.drawInfo;

export const createDraw = async (payload: IDraw) =>
  Draws.create(payload, { include: [{ model: DrawInfo, as: "drawInfo" }] });

export const updateDraw = async (payload: IDraw, id: number) =>
  Draws.update(payload, {
    where: { id },
  });

export const getDrawByParams = async (params: any) =>
  Draws.findOne({ where: params });

export const getDraws = async () =>
  Draws.findAll({ include: [{ model: DrawInfo, as: "drawInfo" }] });

// delete draws
export const deleteDraw = async (id: number) =>
  Draws.destroy({ where: { id }, benchmark: true });

export const updateDrawInfo = async (payload: IDrawInfo, drawId: number) =>
  DrawInfo.update(payload, { where: { drawId } });

export const decrementTicketsAvaliable = async (
  drawId: number,
  by: number = 1
) => Draws.decrement({ ticketsAvaliable: by }, { where: { id: drawId } });

// getDrawsByStatus;
export const getDrawsByStatus = async (status: string) => {
  const draws = await Draws.findAll({
    where: { status },
    include: [{ model: DrawInfo, as: "drawInfo" }],
  });
  return draws;
};
