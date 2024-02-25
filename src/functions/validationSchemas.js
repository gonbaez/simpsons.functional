import Joi from "joi";

export const searchSchema = {
  "Search string": Joi.string().min(3).allow(null, ""),
};
