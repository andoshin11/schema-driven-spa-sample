import { RequestHandler } from "express";
import { ParsedQs } from "qs";
declare module "express-serve-static-core" {
  type Pet = {
    id: number;
    name: string;
    category: 1 | 2 | 3;
    sex: "male" | "female";
  };
  type Error = {
    code: number;
    message: string;
  };
  type _ResBody<
    M extends
      | "all"
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch"
      | "options"
      | "head" = any,
    GetRes = any,
    PostRes = any,
    PutRes = any,
    DeleteRes = any,
    PatchRes = any
  > = "get" extends M
    ? GetRes
    : "post" extends M
    ? PostRes
    : "put" extends M
    ? PutRes
    : "delete" extends M
    ? DeleteRes
    : "patch" extends M
    ? PatchRes
    : any;
  type _ReqBody<
    M extends
      | "all"
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch"
      | "options"
      | "head" = any,
    GetRes = any,
    PostRes = any,
    PutRes = any,
    DeleteRes = any,
    PatchRes = any
  > = "get" extends M
    ? GetRes
    : "post" extends M
    ? PostRes
    : "put" extends M
    ? PutRes
    : "delete" extends M
    ? DeleteRes
    : "patch" extends M
    ? PatchRes
    : any;
  type _ReqQuery<
    M extends
      | "all"
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch"
      | "options"
      | "head" = any,
    GetRes = any,
    PostRes = any,
    PutRes = any,
    DeleteRes = any,
    PatchRes = any
  > = "get" extends M
    ? GetRes
    : "post" extends M
    ? PostRes
    : "put" extends M
    ? PutRes
    : "delete" extends M
    ? DeleteRes
    : "patch" extends M
    ? PatchRes
    : any;
  export interface IRouterMatcher<
    T,
    Method extends
      | "all"
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch"
      | "options"
      | "head" = any
  > {
    <
      P extends Params = ParamsDictionary,
      ResBody = _ResBody<
        Method,
        {
          pets: Pet[];
        },
        {
          pet: Pet;
        },
        any,
        any,
        any
      >,
      ReqBody = _ReqBody<
        Method,
        null,
        {
          name: string;
          category: 1 | 2 | 3;
          sex: "male" | "female";
        },
        any,
        any,
        any
      >,
      ReqQuery = _ReqQuery<
        Method,
        {
          limit?: number;
          offset?: number;
        },
        null,
        ParsedQs,
        ParsedQs,
        ParsedQs
      >
    >(
      path: "/pets",
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
    ): T;
    <
      P extends Params = {
        petId: string;
      },
      ResBody = _ResBody<
        Method,
        {
          pet: Pet;
        },
        any,
        any,
        any,
        any
      >,
      ReqBody = _ReqBody<Method, null, any, any, any, any>,
      ReqQuery = _ReqQuery<Method, null, ParsedQs, ParsedQs, ParsedQs, ParsedQs>
    >(
      path: "/pets/:petId",
      ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
    ): T;
  }
}
