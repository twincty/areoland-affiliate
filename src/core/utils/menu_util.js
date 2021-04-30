export const filterMenu = (menuList, match) => {
  let path = match.url;
  const params = Object.keys(match.params);
  params.forEach((param) => {
    path = path.replace("/" + match.params[param], "");
  });

  const results = recursivelyFindKeyValue("link", path, menuList);

  if (results.length) {
    return results[results.length - 1].containingArray;
  } else {
    return menuList;
  }
};

const recursivelyFindKeyValue = (key, keyValue, list, depth = 0) => {
  let results = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    for (const key of Object.keys(item)) {
      //check if its not an array
      if (Array.isArray(item[key])) {
        let res = recursivelyFindKeyValue(key, keyValue, item[key], depth + 1);
        results = results.concat(res);
      } else {
        if (item["matchingLink"]) {
          if (item["matchingLink"] === keyValue) {
            if (!item.parent) {
              results.push({
                found: true,
                containingArray: list,
                depth: depth,
                object: item,
              });
            }
          }
        } else if (item[key] === keyValue) {
          //found, return the list
          if (!item.parent) {
            results.push({
              found: true,
              containingArray: list,
              depth: depth,
              object: item,
            });
          }
        }
      }
    }
  }

  return results;
};
