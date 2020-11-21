import React from "react";
import { Card } from "./style";

function Cards({ item }) {
  return (
    <Card>
      <div className="imageWrapper">
        <img src={item.coverImage} alt="" />
        <div className="upcomingDiv">dd</div>
      </div>
      <h5 className="title">{item.name}</h5>
    </Card>
  );
}

export default Cards;
