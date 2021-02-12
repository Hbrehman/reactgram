import React from "react";

const Like = ({ liked, onLike }) => {
  return (
    <i
      style={{ cursor: "pointer" }}
      className={liked ? "fa fa-heart" : "fa fa-heart-o"}
      onClick={onLike}
    ></i>
  );
};

export default Like;
