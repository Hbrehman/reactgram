import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";
import { saveGadget, getGadget } from "../services/gadgetService";
import { getCategories } from "../services/categoryService";

class GadgetForm extends Form {
  state = {
    categories: [],
    data: {
      _id: "",
      title: "",
      categoryId: "",
      quantity: "",
      price: "",
    },
    errors: {},
  };

  async componentDidMount() {
    await this.populateCategories();
    await this.populateGadgets();
  }

  mapToViewModel(gadget) {
    return {
      _id: gadget._id,
      title: gadget.title,
      categoryId: gadget.category._id,
      quantity: gadget.quantity,
      price: gadget.price,
    };
  }

  async populateGadgets() {
    try {
      const gadgetId = this.props.match.params.id;
      if (gadgetId === "new") return;
      const { data: gadget } = await getGadget(gadgetId);

      this.setState({ data: this.mapToViewModel(gadget) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.push("/notFound");
      }
    }
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  schema = {
    _id: Joi.string().optional().allow(""),
    liked: Joi.boolean(),
    title: Joi.string().min(5).max(255).required().label("Title"),
    categoryId: Joi.string().required(),
    quantity: Joi.number().min(1).max(255).required().label("Quantity"),
    price: Joi.number().min(1).max(100000).required().label("Price"),
  };

  async doSubmit() {
    // //Call the server
    await saveGadget(this.state.data);

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}

          {this.renderSelect("categoryId", "Category", this.state.categories)}

          {this.renderInput("quantity", "Quantity", "number")}
          {this.renderInput("price", "Price", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default GadgetForm;
