const path = require('path');
const fs = require('fs');

const loader = require('..');
const webpack = require('./helpers/compiler');

describe('loader', () => {
  it('should export the loader', () => {
    expect(loader).toBeInstanceOf(Function);
  });

  it('should handle null string', async () => {
    const testId = './null.http';
    const stats = await webpack(testId);
    const { modules } = stats.toJson();
    const module = modules.find((m) => m.id === testId);
    expect(module.source).toMatchSnapshot('module');
    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(stats.compilation.errors).toMatchSnapshot('errors');
    expect(module.source).toEqual('');
  });

  it('should handle valid HTTP', async () => {
    const testId = './test.http';
    const stats = await webpack(testId);
    const { modules } = stats.toJson();
    const module = modules.find((m) => m.id === testId);

    expect(module.source).toMatchSnapshot('module');
    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(stats.compilation.errors).toMatchSnapshot('errors');

    const content = fs
      .readFileSync(path.resolve(__dirname, './fixtures/redux.4.0.5.min.js'))
      .toString();

    // eslint-disable-next-line no-eval
    expect(module.source).toEqual(content);
  });

  it('should handle invalid HTTP', async () => {
    const testId = './broken.http';
    const stats = await webpack(testId);

    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(
      stats.compilation.errors.map((error) => {
        // eslint-disable-next-line no-param-reassign
        error.message = error.message
          .replace(/\(from .*?\)/i, '(replaced/path)')
          .replace(
            /at ClientRequest.<anonymous> \(.*?\)/i,
            'at ClientRequest.<anonymous> (replaced/path)'
          );

        return error;
      })
    ).toMatchSnapshot('errors');
  });
});
