import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Link } from "@reach/router";

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
  const [input, setInput] = useState({ value: "" });
  const [category, setCategory] = useState("");
  const refInput = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ value: refInput.current.value });
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

  const [
    { error: getMovieErr, response: getMovieRes, loading: mLoading },
    getMovieById,
  ] = useAxios("/api/v1/movies", {
    manual: true,
  });

  useEffect(() => {
    if (input.value) {
      searchResult();
    }
  }, [input.value]);

  const goToMovieDetail = useCallback(
    (movieId) => {
      if (searchResponse && searchResponse.response) {
        if (allMovies[movieId]) {
          setCategory(allMovies[movieId]);
        } else {
          setCategory("search");
        }
      }
    },
    [allMovies, getMovieById, searchResponse]
  );

  return (
    <div>
      <TopBar />
      <Wrapper>
        <Container>
          <Row>
            <SearchInput>
              <input
                ref={refInput}
                name="search-input"
                type="text"
                autoComplete="off"
                placeholder="search by movie name!"
                onChange={(e) => handleChange(e)}
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
                    Could not find movies with this search term, give me more
                    characters.
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
                            <p>{movie.premiere}</p>
                            {/* {moment().diff(movie.premiere, "minutes") >
                            moment() ? (
                              "upcoming"
                            ) : (
                              <Moment
                                date={movie.premiere}
                                format="ddd D MMM"
                              />
                            )} */}
                          </div>
                          <div className="right-side"> show</div>
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
