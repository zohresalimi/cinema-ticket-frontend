import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { Card } from "./style";

function Cards({ item }) {
  const { i18n } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const currentDate = new Date().toJSON();
    if (item.premiere > currentDate) {
      setIsShow(true);
    }
  }, []);

  return (
    <Card>
      <div className="imageWrapper">
        <img src={item.coverImage} alt="" />
        {isShow && (
          <Moment
            locale={i18n.language}
            format="YYYY/MM/DD"
            date={item.premiere}
            className="time-wrapper"
          />
        )}
      </div>
      <h5 className="title">{item.name}</h5>
    </Card>
  );
}

export default Cards;
