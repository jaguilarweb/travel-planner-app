import { handleSubmit } from "../client/js/formHandler";

describe('Test for submit function', () => {
  test('Test handlerSubmit() function', () => {
     expect(handleSubmit).toBeDefined();
  });
});
