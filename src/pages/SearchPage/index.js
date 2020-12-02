/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";

import { SearchInput, Wrapper } from "./style";
import { Container, Row } from "../../Styles/StyleComponents";
import AppContext from "../../store/context";

function SearchPage() {
  const { state } = useContext(AppContext);
  const { allMovies } = state.movies;
  const { t } = useTranslation();
  const [input, setInput] = useState({ value: "" });

  const [
    { response: searchResponse, loading: searchLoading },
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
    }
  }, [input.value]);

  return (
    <div>
      <TopBar />
      <Wrapper>
        <Container>
          <Row>
            <SearchInput>
              <input
                name="search-input"
                type="text"
                autoComplete="off"
                data-testid="search-input"
                placeholder={t("search by movie name!")}
                onChange={(e) => setInput({ value: e.target.value })}
              />
              <FontAwesomeIcon icon={faSearch} className="searchIcon" />
            </SearchInput>
            {searchLoading && (
              <div className="spiner-wraper">
                <FontAwesomeIcon icon={faSpinner} className="spiner" spin />
              </div>
            )}
            <ul id="movie-List">
              {searchResponse && !searchResponse.response.length && (
                <div className="no-result-message">
                  <p>
                    {t(
                      "Could not find movies with this search term, give me more characters."
                    )}
                  </p>
                </div>
              )}
              {searchResponse && searchResponse.response.length
                ? searchResponse.response.map((movie) => {
                    return (
                      <li key={movie._id}>
                        <Link
                          to={`/${
                            allMovies[movie._id] || "search"
                          }/movie-detail/${movie._id}`}
                        >
                          <div className="image-wrapper">
                            <img src={movie.coverImage} alt="" />
                          </div>
                          <div>
                            <p>{movie.name}</p>
                            <p>{movie.genre}</p>
                          </div>
                          <div className="right-side">{t("show")}</div>
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </Row>
        </Container>
      </Wrapper>
    </div>
  );
}

export default SearchPage;
