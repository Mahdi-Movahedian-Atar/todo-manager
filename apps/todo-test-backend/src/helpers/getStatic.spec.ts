import * as process from 'process';
import { getPort, getURL } from './getStatic';

describe('getStatic', () => {
  it('should get root url', function () {
    console.log(getPort());
    expect(getPort()).toEqual(
      `http://localhost:3333/api` || `http://localhost:${process.env.PORT}/api`
    );
  });
  it('should get mongo url', function () {
    expect(getURL()).toEqual(`mongodb://localhost:27017/Todo-Test`);
  });
});
