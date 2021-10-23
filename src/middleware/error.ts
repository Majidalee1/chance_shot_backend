import Boom = require("boom");
import Joi = require("joi");
import { Context } from "koa";
import * as compose from "koa-compose";

export interface IMetaData {
  status: number;
  message: string;
  limit?: number;
  offset?: number;
  totalCount?: number;
  stack?: string;
  unreadCount?: number;
}

const handler = async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (error) {
    let metaData: IMetaData = {} as IMetaData;

    ctx.log.error(error);

    if (error.isBoom) {
      metaData = handleBoomError(error);
    }
    if (error.isJoi) {
      metaData = handleJoiError(error);
    } else {
      metaData = {
        status: 500,
        message: error.message || "error.internal_server",
      };
    }

    metaData.stack = error.stack;
    ctx.status = +metaData.status;
    ctx.body = {
      meta: metaData,
    };

    // TODO: Handle error that are not instance of `boom`
    ctx.app.emit("error", error, ctx);
    // throw error;
  }
};

const handleJoiError = (err: Joi.ValidationError): IMetaData => {
  return {
    status: 400,
    message: err.details[0].message,
  };
};
const handleBoomError = (err: Boom): IMetaData => {
  return {
    status: +err.output.statusCode,
    message: err.message,
  };
};

export default () => compose([handler]);
