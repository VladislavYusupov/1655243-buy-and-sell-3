'use strict';

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  getRandomItemsFromArray
} = require(`../../utils`);

const {
  FILE_SENTENCES_PATH, FILE_TITLES_PATH, FILE_CATEGORIES_PATH
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
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_OFFER;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));

    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};

const readContent = async (filePath) => {
  const encoding = `utf-8`;

  try {
    const content = await fs.readFile(filePath, encoding);
    return content.split(`\n`).filter((e) => e !== ``);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    category: getRandomItemsFromArray(categories),
    description: shuffle(sentences).slice(DescriptionSentencesRestrict.MIN, DescriptionSentencesRestrict.MAX).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[getRandomInt(0, Object.keys(OfferType).length - 1)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

