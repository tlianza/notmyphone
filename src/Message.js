import React from "react";
import TimeAgo from 'react-timeago';

export default ({ name, message, icon, arrivalTime }) => {
  var imgAttr = { src: "data:image/jpeg;base64, " + icon, alt: name, className: "card-img"};
  //{icon && <img {...imgAttr} />}
  return (
      <div className="card text-white">
          <div className="card-text">
              <h5>{name}</h5>
              {message}
          </div>
          <div className="card-footer">
              <small className="text-muted"><TimeAgo date={arrivalTime} /></small>
          </div>
      </div>
  );
};
