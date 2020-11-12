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
  cinemas: [],
  ticket: {
    movie: {},
    status: false,
    quantity: 0,
    price: 0,
    seatNumbers: new Map(),
    user: {},
    showing: {},
  },
  showings: [],
};

export default state;
