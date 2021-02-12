const { Gadget, validate } = require("../models/gadget");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const gadgets = await Gadget.find().select("-__v").sort("name");
  res.send(gadgets);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const gadget = new Gadget({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    quantity: req.body.quantity,
    price: req.body.price,
    publishDate: moment().toJSON(),
  });
  await gadget.save();

  res.send(gadget);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const gadget = await Gadget.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      quantity: req.body.quantity,
      price: req.body.price,
    },
    { new: true }
  );

  if (!gadget)
    return res.status(404).send("The gadget with the given ID was not found.");

  res.send(gadget);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const gadget = await Gadget.findByIdAndRemove(req.params.id);

  if (!gadget)
    return res.status(404).send("The gadget with the given ID was not found.");

  res.send(gadget);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const gadget = await Gadget.findById(req.params.id).select("-__v");

  if (!gadget)
    return res.status(404).send("The gadget with the given ID was not found.");

  res.send(gadget);
});

module.exports = router;
