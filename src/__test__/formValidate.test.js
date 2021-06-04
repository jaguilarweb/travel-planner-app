import { validate } from "../client/js/formValidate";

describe('Test validate function', () => {
  test('Location input empty', () => {
    expect(validate("","2021-06-21")).toBeFalsy();
  });
  test('Date input empty', () => {
    expect(validate("London","")).toBeFalsy();
  });
  test('Location and Date inputs empty', () => {
    expect(validate("","")).toBeFalsy();
  });
  test('Location and Date inputs were populate', () => {
    expect(validate("London","2021-06-2021")).toBeTruthy();
  });
});
