import merge from "./merge";
import { Indexed } from "./types";

function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be a string");
  }

  const keys = path.split(".");
  let currentObj: Indexed = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!currentObj[key] || typeof currentObj[key] !== "object") {
      currentObj[key] = {};
    }

    currentObj = currentObj[key] as Indexed;
  }

  currentObj[keys[keys.length - 1]] = value;

  return merge(object, {});
}

export default set;
