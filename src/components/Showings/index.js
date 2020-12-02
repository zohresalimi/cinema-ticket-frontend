import React, { useContext } from "react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import "moment-timezone";

import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";

function getBookingText(showing) {
  if (!showing.capacity) return "sold out";
  if (new Date(showing.startTime) < new Date()) return "time passed";
  return "buy ticket";
}

function Showings({ category, currentMovie }) {
  const { state } = useContext(AppContext);
  const { cinemas, showings } = state;
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
                showingsByCinema.map((el) => (
                  <li
                    key={el._id}
                    className={
                      getBookingText(el) !== "buy ticket" ? "unclickable" : ""
                    }
                  >
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
                        <div>
                          <p className="room-name">{t(el.room.name)}</p>
                          <p className="movie-subtitle">
                            {t("lang")}
                            <span>:</span>
                            {t(currentMovie.originalTitle)}
                          </p>
                          <p>
                            <Moment
                              tz="Europe/Stockholm"
                              date={el.startTime}
                              format="YYYY-MM-DD"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="buy-ticket">
                        <p>{t(getBookingText(el))}</p>
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
