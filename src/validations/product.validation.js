const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().integer().min(0).required()
});

module.exports = { productSchema };