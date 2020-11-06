import { useEffect, useReducer, useMemo, useCallback } from "react";
import axios from "axios";
import qs from "qs";

const baseUrl = process.env.REACT_APP_BASE_URL;
const actions = {
  REQUEST_START: "REQUEST_START",
  REQUEST_END: "REQUEST_END",
};

async function fetchData({ path, ...config }, dispatch) {
  try {
    dispatch({ type: actions.REQUEST_START });
    const result = await axios({
      ...config,
      url: `${baseUrl}${path}`,
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    dispatch({ type: actions.REQUEST_END, payload: result.data });
  } catch (err) {
    dispatch({
      type: actions.REQUEST_END,
      payload: err,
      error: true,
    });
  }
}

const useAxios = (path, config) => {
  function reducer(state, action) {
    switch (action.type) {
      case actions.REQUEST_START:
        return {
          ...state,
          response: null,
          loading: true,
          error: null,
        };
      case actions.REQUEST_END:
        return {
          ...state,
          loading: false,
          ...(action.error ? {} : { data: action.payload.data }),
          [action.error ? "error" : "response"]: action.payload,
        };
      default:
        return state;
    }
  }

  function createInitialState({ manual }) {
    return {
      loading: !manual,
      error: null,
      response: null,
    };
  }

  const options = useMemo(
    () => ({
      data: {},
      method: "get",
      manual: false,
      path,
      ...config,
    }),
    [config, path]
  );
  const [state, dispatch] = useReducer(reducer, createInitialState(options));

  useEffect(() => {
    if (!options.manual) {
      fetchData(options, dispatch);
    }
  }, [options, dispatch, path]);

  const refetch = useCallback(
    (payload) => {
      return fetchData({ ...options, ...payload }, dispatch);
    },
    [options, dispatch]
  );

  return [state, refetch];
};

export default useAxios;
