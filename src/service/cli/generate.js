'use strict';

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
} = require(`../../utils`);

const {
  CATEGORIES, SENTENCES, TITLES
} = require(`../../data/generate`);

const {
  OfferType, SumRestrict, PictureRestrict, DescriptionSentencesRestrict, ExitCode
} = require(`./const`);

const fs = require(`fs`);

const DEFAULT_COUNT_OFFER = 1;
const MAX_COUNT_OFFER = 1000;
const MOCKS_FILE_NAME = `mocks.json`;

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_OFFER;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(MOCKS_FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(DescriptionSentencesRestrict.MIN, DescriptionSentencesRestrict.MAX).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

