import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";

import { SearchInput } from "./style";
import { Container, Row } from "../../Styles/StyleComponents";

function SearchPage() {
  const [input, seInput] = useState({ value: "" });
  const [debouncedText] = useDebounce(input, 1000);
  const refInput = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    seInput({ value: refInput.current.value });
  };

  const [
    { error, response: searchResponse, loading: searchLoading },
    searchResult,
  ] = useAxios("/api/v1/movies/search", {
    manual: true,
    params: {
      query: input.value,
    },
  });
  useEffect(() => {
    if (input.value) {
      searchResult();
      console.log(searchResponse);
    }
  }, [input.value]);
  return (
    <div>
      <TopBar />
      <Container>
        <Row>
          <SearchInput>
            <input
              ref={refInput}
              name="search-input"
              type="text"
              placeholder="search by movie name!"
              onChange={(e) => handleChange(e)}
            />
            <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            {searchLoading && (
              <FontAwesomeIcon icon={faSpinner} className="spiner" spin />
            )}
          </SearchInput>
          <ul id="ingredients">
            {searchResponse &&
              searchResponse.map((movie) => {
                return <div>{movie.name}</div>;
              })}
          </ul>
        </Row>
      </Container>
    </div>
  );
}

export default SearchPage;
