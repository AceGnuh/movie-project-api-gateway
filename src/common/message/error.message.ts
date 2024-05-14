import { IS_NOT_EMPTY } from 'class-validator';

export const ERROR_MESSAGE = {
  IS_STRING: function (columnName: string) {
    return `${columnName} must be a string`;
  },
  IS_NOT_EMPTY: function (columnName: string) {
    return `${columnName} must not be empty`;
  },
  IS_NUMBER: function (columnName: string) {
    return `${columnName} must be a number`;
  },
  VALUE_MUST_BE_GREATER_THAN_OTHER_VALUE: function (
    columnName: string,
    otherColumnName: string,
  ) {
    return `${columnName} must be greater than ${otherColumnName}`;
  },
  MIN_VALUE: function (columnName: string) {
    return `${columnName} must be greater than 0`;
  },
  VALUE_NOT_APPROPRIATE: function (columnName: string) {
    return `Value of ${columnName} is not appropriate`;
  },
  IS_DATE: function (columnName: string) {
    return `${columnName} must follow the date format (yyyy-mm-dd)`;
  },
  IS_BOOLEAN: function (columnName: string) {
    return `${columnName} must be true or false`;
  },
  GRAPHQL_VALIDATION_FAILED: 'GRAPHQL_VALIDATION_FAILED',
};
