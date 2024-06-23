export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
