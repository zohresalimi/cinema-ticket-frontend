import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { PlayBtn, Div, RoundBut } from "./style";

function PlayButton({ setPlayVideo }) {
  return (
    <Div onClick={() => setPlayVideo(true)} data-testid="play-btn">
      <RoundBut>
        <PlayBtn>
          <FontAwesomeIcon icon={faPlay} />
        </PlayBtn>
      </RoundBut>
    </Div>
  );
}

export default PlayButton;
