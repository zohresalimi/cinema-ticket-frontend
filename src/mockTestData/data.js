import React from "react";
import { Router } from "@reach/router";
import AppContext from "../store/context";
import Theme from "../Styles/Theme";

export const getTestStore = () => {
  return {
    dispatch: () => {},
    state: {
      user: {
        name: "",
        email: "",
      },
      movies: {
        children: [
          {
            _id: "5fa71823adc463397a50c501",
            actors: ["Holland Roden", "Ronen Rubinstein", "Keegan Allen"],
            age: "7",
            coverImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/68bfeef55ada4e7ab0606db2af0f40ad.jpg?width=240&version=EA2E80EE161E5DA161C6E26487054C9F&format=webp",
            description:
              "Poppy and Kvist embark on an adventure that will take them far beyond",
            director: "aaron woodley",
            duration: "1:31",
            genre: ["family", "children"],
            images: [],
            largeImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/79276cead82341d2a004f8e8f99a88e9.jpg?width=1920&version=08F0C83177D59FB94C4C809F63F67E2A&format=webp",
            name: "trolls 2: world tour",
            originalTitle: "swedish",
            premiere: "2020-10-03T15:18:52.722Z",
            rooms: ["5fa653d0a7f1201999dd1ac0"],
            trailerUrl: "https://youtu.be/P9A6hOg9QQ0",
          },
        ],
        premiered: [
          {
            _id: "5fa71823adc463397a50c502",
            actors: ["Holland Roden", "Ronen Rubinstein", "Keegan Allen"],
            age: "7",
            coverImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/68bfeef55ada4e7ab0606db2af0f40ad.jpg?width=240&version=EA2E80EE161E5DA161C6E26487054C9F&format=webp",
            description:
              "Poppy and Kvist embark on an adventure that will take them far beyond",
            director: "aaron woodley",
            duration: "1:31",
            genre: ["family", "children"],
            images: [],
            largeImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/79276cead82341d2a004f8e8f99a88e9.jpg?width=1920&version=08F0C83177D59FB94C4C809F63F67E2A&format=webp",
            name: "follow me",
            originalTitle: "swedish",
            premiere: "2020-10-05T15:18:52.722Z",
            rooms: ["5fa653c0643c06586bba7d78"],
            trailerUrl: "https://youtu.be/P9A6hOg9QQ0",
          },
        ],
        upcoming: [
          {
            _id: "5fa71823adc463397a50c503",
            actors: ["Holland Roden", "Ronen Rubinstein", "Keegan Allen"],
            age: "7",
            coverImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/68bfeef55ada4e7ab0606db2af0f40ad.jpg?width=240&version=EA2E80EE161E5DA161C6E26487054C9F&format=webp",
            description:
              "Poppy and Kvist embark on an adventure that will take them far beyond",
            director: "aaron woodley",
            duration: "1:31",
            genre: ["family", "children"],
            images: [],
            largeImage:
              "https://catalog.cinema-api.com/cf/images/ncg-images/79276cead82341d2a004f8e8f99a88e9.jpg?width=1920&version=08F0C83177D59FB94C4C809F63F67E2A&format=webp",
            name: "honest thief",
            originalTitle: "swedish",
            premiere: "2021-01-03T15:18:52.722Z",
            rooms: ["5fa653c0643c06586bba7d78"],
            trailerUrl: "https://youtu.be/P9A6hOg9QQ0",
          },
        ],
        allMovies: {
          "5fa71823adc463397a50c501": "children",
          "5fa71823adc463397a50c502": "premiered",
          "5fa71823adc463397a50c503": "upcoming",
        },
      },
      cinemas: [
        {
          _id: "5fa64fe234fbbf9945f3a3ce",
          name: "filmstaden kista",
          purchaseEndTime: "21:30",
          purchaseStartTime: "8:00",
          rooms: ["5fa653c0643c06586bba7d78", "5fa653d0a7f1201999dd1ac0"],
        },
      ],
      ticket: {
        movie: {},
        status: false,
        quantity: 0,
        price: 0,
        seatNumbers: new Map(),
        user: {},
        showing: {},
      },
      showings: [
        {
          _id: "5fbe9bd31f58462b5c759b5c",
          capacity: 4,
          cinema: "5fa64fe234fbbf9945f3a3ce",
          endTime: null,
          movie: {
            _id: "5fa71823adc463397a50c502",
            actors: ["Holland Roden", "Ronen Rubinstein", "Keegan Allen"],
            age: "7",
            description:
              "Poppy and Kvist embark on an adventure that will take them far beyond",
            director: "aaron woodley",
            duration: "1:31",
            genre: ["family", "children"],
            images: [],
            name: "follow me",
            originalTitle: "swedish",
            premiere: "2020-10-05T15:18:52.722Z",
            rooms: ["5fa653c0643c06586bba7d78"],
            trailerUrl: "https://youtu.be/P9A6hOg9QQ0",
          },
          price: 100,
          room: { _id: "5fa653c0643c06586bba7d78" },

          seats: [
            [
              { seatNumber: 1, taken: "available" },
              { seatNumber: 1, taken: "available" },
            ],
            [
              { seatNumber: 1, taken: "available" },
              { seatNumber: 1, taken: "available" },
            ],
          ],
          startTime: "2020-11-13T16:00:00.000Z",
        },
      ],
    },
  };
};

export const WithProvider = (props) => {
  const { state, dispatch } = getTestStore();
  return (
    <Theme>
      <AppContext.Provider
        value={{ state: props.defaultValue || state, dispatch }}
      >
        <Router>{props.children}</Router>
      </AppContext.Provider>
    </Theme>
  );
};
