import React from "react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import "moment-timezone";

import { useTranslation } from "react-i18next";

function Showings({ cinemas, showings, category, currentMovie }) {
  const { t } = useTranslation();

  return (
    <div data-testid="showings-wrapper">
      {cinemas.map((item) => {
        const showingsByCinema = showings.filter(
          (showing) => showing.room.cinema === item._id
        );
        return (
          <div key={item._id}>
            <h2 className="cinema-name">{item.name}</h2>
            <ul className="showings-list">
              {!!showingsByCinema.length &&
                showingsByCinema
                  .filter((showing) => showing.capacity > 0)
                  .map((el) => (
                    <li key={el._id}>
                      <Link
                        to={`../../../booking/${el._id}`}
                        state={{ category }}
                      >
                        <div className="showing-info">
                          <p className="time-slot">
                            <Moment
                              tz="Europe/Stockholm"
                              date={el.startTime}
                              format="hh:mm"
                            />
                          </p>
                          <p className="room-name">{t(el.room.name)}</p>
                          <p className="movie-subtitle">
                            {t("lang")}
                            <span>:</span>
                            {t(currentMovie.originalTitle)}
                          </p>
                        </div>
                        <div className="buy-ticket">
                          <p>{t("buy ticket")}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Showings;
