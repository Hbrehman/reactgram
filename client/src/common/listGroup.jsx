import React from "react";

const ListGroup = ({
  categories,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedCategory,
}) => {
  return (
    <ul className="list-group">
      {categories.map((category) => (
        <li
          onClick={() => onItemSelect(category)}
          key={category[valueProperty]}
          className={
            selectedCategory._id === category._id
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {category[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
