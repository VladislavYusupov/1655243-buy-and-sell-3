'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  ERROR: 1,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const DescriptionSentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  HttpCode,
  ExitCode,
  OfferType,
  SumRestrict,
  PictureRestrict,
  DescriptionSentencesRestrict
};
