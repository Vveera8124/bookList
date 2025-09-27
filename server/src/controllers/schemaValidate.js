import joi from "joi";

const bookSchema = joi.object({
  title: joi.string().trim().max(255).required(),
  author: joi.string().trim().max(255).required(),
  genre: joi.string().trim(),
  publishedYear: joi
    .number()
    // .pattern(/^\d{4}$/)
    .required(),
  isbn: joi.string().trim(),
});

export default bookSchema;
