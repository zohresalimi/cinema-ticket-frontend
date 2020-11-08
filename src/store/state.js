const state = {
  user: {
    name: "",
    email: "",
  },
  movies: {
    children: [],
    premiered: [],
    upcoming: [],
  },
  ticket: {
    movie: {},
    status: false,
    quantity: 0,
    price: 0,
    seatNumbers: [],
    user: {},
    showing: {},
    cinemaName: "",
    roomName: "",
    movieName: "",
  },
  showings: [],
  seatsNumber: [],
};

export default state;
