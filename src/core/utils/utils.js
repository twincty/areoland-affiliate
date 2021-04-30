const gen4 = () => {
  return Math.random().toString(16).slice(-4);
};

export const uid = (prefix) => {
  return (prefix || "").concat(
    [gen4(), gen4(), gen4(), gen4(), gen4(), gen4(), gen4(), gen4()].join("")
  );
};
