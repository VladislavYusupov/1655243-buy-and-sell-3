'use strict';

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomItemsFromArray
} = require(`../../utils`);

const {
  CATEGORIES, SENTENCES, TITLES
} = require(`../../data/generate`);

const {
  OfferType, SumRestrict, PictureRestrict, DescriptionSentencesRestrict, ExitCode
} = require(`./const`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT_OFFER = 1;
const MAX_COUNT_OFFER = 1000;
const MOCKS_FILE_NAME = `mocks.json`;

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_OFFER;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));

    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getRandomItemsFromArray(CATEGORIES),
    description: shuffle(SENTENCES).slice(DescriptionSentencesRestrict.MIN, DescriptionSentencesRestrict.MAX).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

