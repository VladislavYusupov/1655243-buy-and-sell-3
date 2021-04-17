'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getPictureFileName = (pictureNumber) => {
  if (pictureNumber.toString().length === 1) {
    pictureNumber = `0${pictureNumber}`;
  }

  return `item${pictureNumber}.jpg`;
};

const getRandomItemsFromArray = (array) => {
  const shuffledArray = shuffle([...array]);
  const arrayLastItemIndex = shuffledArray.length - 1;
  const randomStartIndex = getRandomInt(1, arrayLastItemIndex - 1);

  return shuffledArray.slice(randomStartIndex, arrayLastItemIndex);
};

module.exports = {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomItemsFromArray
};
