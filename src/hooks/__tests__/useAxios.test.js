import React from "react";
import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import useAxios from "../useAxios";

jest.mock("axios", () => {
  return {
    __esModule: true,
    default: jest.fn().mockResolvedValue({ data: {} }),
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
  };
});

function makeSetup() {
  return (config = "", options = null) =>
    renderHook(
      ({ config, options }) => {
        return useAxios(config, options);
      },
      {
        initialProps: { config, options },
      }
    );
}
const setup = makeSetup(useAxios);

// call function
//useAxios(endpoint, method, data);

describe("useAxios", () => {
  it("should be a function", () => {
    expect(useAxios).toBeInstanceOf(Function);
  });

  it("should set loading to true and error to null before the request resolves", async () => {
    const { result, waitForNextUpdate } = setup();

    expect(result.current[0].loading).toBe(true);
    expect(result.current[0].error).toBe(null);

    await waitForNextUpdate();
  });

  it("should provide a custom implementation of axios", async () => {
    axios.mockResolvedValue({ data: "something" });
    const { result, waitForNextUpdate } = setup();

    expect(axios).toHaveBeenCalled();
    await waitForNextUpdate();
    expect(result.current[0].response).toBe("something");
    expect(result.current[0].loading).toBe(false);
    expect(result.current[0].error).toBe(null);
  });

  it("should set error when request fails", async () => {
    const error = new Error("failed");

    axios.mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = setup();

    await waitForNextUpdate();

    expect(result.current[0].error).toBe(error);
  });

  it("should reset error when refetch succeeds", async () => {
    const error = new Error("boom");

    axios.mockRejectedValueOnce(error);

    const { result, waitForNextUpdate } = setup();

    await waitForNextUpdate();

    expect(result.current[0].error).toBe(error);

    axios.mockResolvedValueOnce({ data: "something" });

    // Refetch
    act(() => {
      result.current[1]();
    });

    await waitForNextUpdate();

    expect(result.current[0].error).toBe(null);
  });
});
