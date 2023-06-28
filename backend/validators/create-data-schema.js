import * as yup from "yup";

export const createDataSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();
