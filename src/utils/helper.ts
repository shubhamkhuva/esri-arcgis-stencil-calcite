export const getFilteredArray = (data, key, value) => {
  return data.filter(item => item[key] === value);
};
