import { Context } from "koa";
import * as compose from "koa-compose";

export interface IResponse {
  meta: IMetaData;
  data?: any;
}

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
  ctx.body = {} as IResponse;
  ctx.body = {
    meta: {
      status: ctx.status,
      message: ctx.state.message || "success",
    },
    data: ctx.state.data,
  };
  await next();
};

export default () => compose([handler]);
