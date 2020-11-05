import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { PlayBtn, Div, RoundBut } from "./style";

function PlayButton(props) {
  return (
    <Div>
      <RoundBut>
        <PlayBtn>
          <FontAwesomeIcon icon={faPlay} />
        </PlayBtn>
      </RoundBut>
    </Div>
  );
}

export default PlayButton;
