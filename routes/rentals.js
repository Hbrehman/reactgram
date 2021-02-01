const { Rental, validate } = require("../models/rental");
const { Gadget } = require("../models/gadget");
const { Customer } = require("../models/customer");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().select("-__v").sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const gadget = await Gadget.findById(req.body.movieId);
  if (!gadget) return res.status(400).send("Invalid gadget.");

  if (gadget.quantity === 0)
    return res.status(400).send("Gadget not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    gadget: {
      _id: gadget._id,
      title: gadget.title,
      price: gadget.price,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "gadgets",
        { _id: gadget._id },
        {
          $inc: { quantity: -1 },
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", [auth], async (req, res) => {
  const rental = await Rental.findById(req.params.id).select("-__v");

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
