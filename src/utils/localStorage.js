/* eslint-disable no-restricted-syntax */
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY;

function setToJSON(values) {
  const mapItemList = [];
  for (const item of values) {
    mapItemList.push([item[0], [...item[1]]]);
  }

  return mapItemList;
}

function replacer(key, value) {
  const originalObject = this[key];
  if (originalObject instanceof Map) {
    return {
      dataType: "Map",
      value: setToJSON(originalObject.entries()), // or with spread: value: [...originalObject]
    };
  }
  return value;
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value.map((val) => [val[0], new Set(val[1])]));
    }
  }
  return value;
}

export const setLocalStorage = (value) => {
  try {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(value, replacer)
    );
  } catch (e) {
    // catch possible errors:
  }
};
export const getLocalStorage = (initialValue) => {
  try {
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return value ? JSON.parse(value, reviver) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};
