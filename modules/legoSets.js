const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

// Function to initialize the sets array
const initialize = () => {
  return new Promise((resolve, reject) => {
    try {
      setData.forEach((data) => {
        const themeName = themeData.find((theme) => theme.id === data.theme_id)?.name;

        if (themeName) {
          const setWithTheme = { ...data, theme: themeName };
          sets.push(setWithTheme);
        }
      });

      resolve(sets); // Resolving with the sets array since the operation is complete
    } catch (error) {
      reject(error); // Rejecting with an error if there's an issue
    }
  });
};

// Function to get all sets
const getAllSets = () => {
  return new Promise((resolve) => {
    resolve(sets);
  });
};

// Function to get a set by set number
const getSetByNum = (setNum) => {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);

    if (foundSet) {
      resolve(foundSet);
    } else {
      reject(new Error(`Unable to find set with set_num: ${setNum}`));
    }
  });
};

// Function to get sets by theme
const getSetsByTheme = (theme) => {
  return new Promise((resolve, reject) => {
    const themeLowerCase = theme.toLowerCase();
    const foundSets = sets.filter((set) => set.theme.toLowerCase().includes(themeLowerCase));

    if (foundSets.length > 0) {
      resolve(foundSets);
    } else {
      reject(new Error(`Unable to find sets with theme: ${theme}`));
    }
  });
};

// Exporting the functions as a module
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
