const fs = require('fs');
const executeAction = require('../utils/action_execute.js');

const action = 'file_move';

const { SUCCESS, ERROR } = require('../utils/consts.js');

const source = './play-ground/test.txt';
const target = './play-ground/testmove-source/';

const file = './play-ground/testmove-source/test.txt';
const folder = './play-ground/testmove-target/';

beforeEach(() => {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  fs.copyFileSync(source, file);
});

afterEach(() => {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
  if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true });
});

describe(`${action} Tests`, () => {
  test('Testing Success', async () => {
    const actionParameters = { file, folder };
    const result = await executeAction(action, actionParameters);
    // assert
    expect(result).toBe(SUCCESS);
  });

  test('Testing Failure - wrong file', async () => {
    const actionParameters = { file: './play-ground/test.txt.wrong', folder };
    const result = await executeAction(action, actionParameters);
    // assert
    expect(result).toBe(ERROR);
  });

  test('Testing Failure - missing file', async () => {
    const actionParameters = { folder };
    const result = await executeAction(action, actionParameters);
    // assert
    expect(result).toBe(ERROR);
  });

  test('Testing Failure - missing folder', async () => {
    const actionParameters = { file };
    const result = await executeAction(action, actionParameters);
    // assert
    expect(result).toBe(ERROR);
  });

  test('Testing Failure - empty actionParameters', async () => {
    const actionParameters = {};
    const result = await executeAction(action, actionParameters);
    // assert
    expect(result).toBe(ERROR);
  });
});
