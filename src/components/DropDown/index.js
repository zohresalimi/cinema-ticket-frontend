/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-indent-props */
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { SUPPORTED_LOCALES } from "../../constants";
import { Wrapper, MenuLabel, ItemList, Button, CaratContainer } from "./style";

function DropDown() {
  const [isOpened, setIsOpened] = useState(false);
  const { i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(() => i18n.language);
  const [label, setLabel] = useState(
    () =>
      SUPPORTED_LOCALES.find((locale) => locale.code === selectedOption).name
  );

  const dropdownRef = useRef();
  useEffect(() => {
    const externalEventHandler = (e) => {
      if (!isOpened) return;

      const node = dropdownRef.current;

      if (node && node.contains(e.target)) {
        return;
      }

      setIsOpened(false);
    };

    if (isOpened) {
      document.addEventListener("click", externalEventHandler);
    } else {
      document.removeEventListener("click", externalEventHandler);
    }

    return () => {
      document.removeEventListener("click", externalEventHandler);
    };
  }, [isOpened]);

  const handleSelectedItem = (obj) => {
    setSelectedOption(obj.name);
    setLabel(obj.name);
    setIsOpened(!isOpened);
    i18n.changeLanguage(obj.code);
  };
  return (
    <Wrapper ref={dropdownRef}>
      <Button
        data-testid="toggle-dropdown"
        onClick={() => setIsOpened(!isOpened)}
      >
        <p>{selectedOption ? label : "svenska"}</p>
        <CaratContainer isOpen={isOpened}>
          <FontAwesomeIcon icon={faAngleUp} />
        </CaratContainer>
      </Button>
      <MenuLabel>
        {isOpened &&
          SUPPORTED_LOCALES.map((el) => (
            <ItemList key={el.code} onClick={() => handleSelectedItem(el)}>
              {el.name}
            </ItemList>
          ))}
      </MenuLabel>
    </Wrapper>
  );
}

export default DropDown;
