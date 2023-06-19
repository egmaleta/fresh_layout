import {
  AppModule,
  ErrorPageModule,
  MiddlewareModule,
} from "https://deno.land/x/fresh@1.1.6/src/server/types.ts";
import { LayoutManifest, LayoutModule } from "./types.ts";

export const isLayout = (
  fileName: string,
  mod: LayoutManifest["routes"][string],
): mod is LayoutModule => {
  return /^(_layout\.(tsx|jsx|ts|js))$/.test(fileName) && "default" in mod;
};

export const is404 = (
  fileName: string,
  mod: LayoutManifest["routes"][string],
): mod is ErrorPageModule => {
  return /^(_404\.(tsx|jsx|ts|js))$/.test(fileName) && "default" in mod;
};

export const is500 = (
  fileName: string,
  mod: LayoutManifest["routes"][string],
): mod is ErrorPageModule => {
  return /^(_500\.(tsx|jsx|ts|js))$/.test(fileName) && "default" in mod;
};

export const isMiddleware = (
  fileName: string,
  mod: LayoutManifest["routes"][string],
): mod is MiddlewareModule<any> => {
  return /^(_middleware\.(tsx|jsx|ts|js))$/.test(fileName) && "handler" in mod;
};

export const isApp = (
  fileName: string,
  mod: LayoutManifest["routes"][string],
): mod is AppModule => {
  return /^(_app\.(tsx|jsx|ts|js))$/.test(fileName) && "default" in mod;
};
