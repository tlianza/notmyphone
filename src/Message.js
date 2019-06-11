import React from "react";

export default ({ name, message, icon }) => {
  var imgAttr = { src: "data:image/jpeg;base64, " + icon, alt: name };
  return (
    <p>
      {icon && <img {...imgAttr} />}
      <strong>{name}</strong> <em>{message}</em>
    </p>
  );
};
