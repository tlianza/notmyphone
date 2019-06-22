import React from "react";
import TimeAgo from 'react-timeago';

export default ({ name, title, message, icon, arrivalTime }) => {
  var imgAttr = { src: "data:image/jpeg;base64, " + icon, alt: name, className: "card-img"};
  //{icon && <img {...imgAttr} />}
  return (
      <div className="d-flex col">
          <div className="card text-white flex-fill">
              <div className="card-text">
                  <h5>{title}</h5>
                  {message}
              </div>
              <div className="card-footer">
                  <small className="text-muted"><TimeAgo date={arrivalTime} /></small>
              </div>
          </div>
      </div>
  );
};
