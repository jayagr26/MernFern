import * as yup from "yup";

export const updateDataSchema = yup
  .object({
    id: yup.number().required(),
    name: yup.string().required(),
  })
  .required();
