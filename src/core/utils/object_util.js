export const object_reduce = (arr, key, basedOn) => {
  const result = arr.reduce((r, o) => {
    if (o[basedOn] || o[basedOn] === null) {
      return {
        ...r,
        [o[key]]: o[basedOn],
      };
    }
    return r;
  }, {});

  return result;
};

export const reduce_nested_object = (arr, basedOn) => {
  const result = arr.reduce((r, o) => {
    return {
      ...r,
      ...o[basedOn],
    };
  }, {});

  return result;
};

export const isEqualObject = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const resolvePath = (path, obj, separator = ".") => {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
};

export const setObject = (obj, value, path) => {
  const a = path.split(".");
  let o = obj;
  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) o[n] = {};
    o = o[n];
  }
  o[a[0]] = value;
};

export const getObject = (obj, path) => {
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  const a = path.split(".");
  let o = obj;
  while (a.length) {
    const n = a.shift();
    if (!(n in o)) return;
    o = o[n];
  }
  return o;
};
