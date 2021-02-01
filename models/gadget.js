const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Gadget = mongoose.model(
  "Gadgets",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 100000,
    },
  })
);

function validateGadget(gadget) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    categoryId: Joi.objectId().required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
  };

  return Joi.validate(gadget, schema);
}

exports.Gadget = Gadget;
exports.validate = validateGadget;
