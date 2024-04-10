import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const errorHandlingMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const message = action.payload ? action.payload.data : "Something went wrong";
      enqueueSnackbar({ message: `Error: ${message}`, variant: "error" });
    }

    return next(action);
  };