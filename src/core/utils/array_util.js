export const array_reduce = (arr, basedOn) => {
  const result = arr.reduce((r, o) => {
    r.push(o[basedOn]);
    return r;
  }, []);

  return result;
};

export const array_filter = (arr, compareTo, compareWith) => {
  return arr.filter((o) => o[compareTo] === compareWith);
};

export const reduce_filter = (arr, compareTo, compareWith) => {
  const result = arr.reduce((r, o) => {
    let a = o.filter((item) => item[compareTo] === compareWith);
    if (a && a.length) r.push(a);
    return r;
  }, []);

  return result;
};

export const unique_array = (arr) => {
  return [...new Set(arr)];
};

export const in_array = (arr, item) => {
  return arr.indexOf(item) >= 0;
};

export const not_in_array = (arr, item) => {
  return !in_array(arr, item);
};

export const isEqualArrayObject = (arrayOfObject1, arrayOfObject2) => {
  const isSame =
    arrayOfObject1.length === arrayOfObject2.length &&
    arrayOfObject1.every(
      (o, i) =>
        Object.keys(o).length === Object.keys(arrayOfObject2[i]).length &&
        Object.keys(o).every((k) => o[k] === arrayOfObject2[i][k])
    );

  return isSame;
};

export const searchPropertyFromArrayObject = (arrayOfObjects, key, value) => {
  arrayOfObjects.forEach((object) => {
    if (object[key] === value) {
      return object;
    }
  });
};
