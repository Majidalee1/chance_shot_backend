import { Context } from "koa";
import { IDraw } from "../models/draws";

import * as drawService from "../services/draws";

export const getDraws = async (ctx: Context, next: () => void) => {
  ctx.state.data = await drawService.getDraws();
  next();
};

export const createDraw = async (ctx: Context, next: () => void) => {
  const payload: IDraw = {
    name: ctx.request.body.name,
    drawCode: ctx.request.body.drawCode,
    typeId: ctx.request.body.typeId,
    totalTickets: ctx.request.body.totalTickets,
    drawInfo: {
      city: ctx.request.body.city,
      country: ctx.request.body.country,
      address: ctx.request.body.address,
      area: ctx.request.body.area,
      noOfBedrooms: ctx.request.body.noOfBedrooms,
      description: ctx.request.body.description,
      videoUrls: ctx.request.body.videoUrls || [],
      imagesUrls: ctx.request.body.imagesUrls || [],
      longitude: ctx.request.body.longitude,
      latitude: ctx.request.body.latitude,
    },
    ticketsAvaliable: ctx.request.body.ticketsAvaliable,
    status: ctx.request.body.status || "active",
    winnerEntryId: ctx.request.body.winnerEntryId || null,
  };

  ctx.state.data = await drawService.createDraw(payload);
  next();
};

export const updateDraw = async (ctx: Context, next: () => void) => {
  const Id = ctx.params.id;
  const payload: IDraw = {
    name: ctx.request.body.name,
    typeId: ctx.request.body.typeId,
    totalTickets: ctx.request.body.totalTickets,
    status: ctx.request.body.status,
    drawInfo: {
      city: ctx.request.body.city,
      country: ctx.request.body.country,
      address: ctx.request.body.address,
      area: ctx.request.body.area,
      noOfBedrooms: ctx.request.body.noOfBedrooms,
      description: ctx.request.body.description,
      videoUrls: ctx.request.body.videoUrls,
      imagesUrls: ctx.request.body.imagesUrls,
      longitude: ctx.request.body.longitude,
      latitude: ctx.request.body.latitude,
    },
    winnerEntryId: ctx.request.body.winnerEntryId || null,
  };

  ctx.state.data = await drawService.updateDraw(payload, Id);
  next();
};

// getDrawsByStatus
export const getDrawsByStatus = async (ctx: Context, next: () => void) => {
  const status = ctx.params.status || "active";
  ctx.state.data = await drawService.getDrawsByStatus(status);
  next();
};

export const deleteDraw = async (ctx: Context, next: () => void) => {
  ctx.state.data = { message: "Welcome to delete Draw" };
  next();
};

export const getUserDrawsById = async (ctx: Context, next: () => void) => {
  ctx.state.data = { message: "Welcome to getUserDrawsById" };
  next();
};

export const getUserDraws = async (ctx: Context, next: () => void) => {
  ctx.state.data = { message: "Welcome to get User Draws" };
  next();
};

export const createCategory = async (ctx: Context, next: () => void) => {
  const payload = {
    type: ctx.request.body.name,
  };

  ctx.state.data = await drawService.createCategory(payload);
  next();
};
