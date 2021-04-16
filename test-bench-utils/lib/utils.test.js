const utils = require('./utils');

jest.mock('./frameworks', () => ({
  framework: {
    query: { method: 'get', key: 'query' },
    params: { method: 'get', key: 'params', param: ':input' },
    headers: { method: 'get', key: 'headers' },
    body: { method: 'post', key: 'body' },
    cookies: { method: 'post', key: 'cookies' },
    input: { method: 'get' }
  }
}));

jest.mock('./routes', () => ({
  rule: {
    base: '/rule',
    name: 'OWASP Rule 123',
    link: 'https://example.com',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params', 'body'],
    params: ['input', 'second_input'],
    additionalData: ['foo', 'bar'],
    sinks: {
      rule: jest.fn()
    }
  },
  rule2: {
    base: '/rule2',
    name: 'OWASP Rule 345',
    link: 'https://example.com',
    products: ['Assess', 'Protect'],
    inputs: ['query', 'params', 'body'],
    params: ['input', 'second_input'],
    additionalData: ['foo', 'bar'],
    sinks: {
      rule2: {
        noop: jest.fn(),
        unsafe: jest.fn(),
        safe: jest.fn(),
        safe2: jest.fn()
      }
    }
  }
}));

describe('getSinkData', () => {
  it('returns the expected array of SinkData objects for each input', () => {
    const result = utils.getSinkData('rule', 'framework');
    expect(result).toMatchSnapshot();

    const mockSink = require('./routes').rule.sinks.rule;

    result[0].sinks.safe({ input: 'foo' });
    expect(mockSink).toHaveBeenCalledWith({ input: 'foo' }, { safe: true });

    result[1].sinks.unsafe({ input: 'bar' });
    expect(mockSink).toHaveBeenCalledWith({ input: 'bar' });

    result[2].sinks.noop({ input: 'baz' });
    expect(mockSink).toHaveBeenCalledWith({ input: 'baz' }, { noop: true });
  });

  it('returns the expected array of SinkData objects for each sink', () => {
    const result = utils.getSinkData('rule2', 'framework');
    expect(result).toMatchSnapshot();

    const mockSinks = require('./routes').rule2.sinks.rule2;

    result[0].sinks.safe({ input: 'foo' });
    expect(mockSinks.safe).toHaveBeenCalledWith({ input: 'foo' });

    result[1].sinks.safe2({ input: 'fooo' });
    expect(mockSinks.safe2).toHaveBeenCalledWith({ input: 'fooo' });

    result[2].sinks.unsafe({ input: 'bar' });
    expect(mockSinks.unsafe).toHaveBeenCalledWith({ input: 'bar' });

    result[0].sinks.noop({ input: 'baz' });
    expect(mockSinks.noop).toHaveBeenCalledWith({ input: 'baz' });
  });
});

describe('groupSinkData', () => {
  it('returns the expected grouped object', () => {
    const sinkData = utils.getSinkData('rule', 'framework');
    const result = utils.groupSinkData(sinkData);
    expect(result).toMatchSnapshot();
  });
});

describe('getRouteMeta', () => {
  it('returns the metadata for a given route', () => {
    const result = utils.getRouteMeta('rule');
    expect(result).toMatchObject({
      base: '/rule',
      name: 'OWASP Rule 123',
      link: 'https://example.com',
      products: ['Assess', 'Protect'],
      inputs: ['query', 'params', 'body'],
      params: ['input', 'second_input'],
      additionalData: ['foo', 'bar'],
      sinks: {
        rule: expect.any(Function)
      }
    });
  });
});

describe('getInput', () => {
  const key = 'body';
  const params = ['input', 'arg'];
  let req;

  beforeEach(() => {
    req = {
      body: {
        input: 'foo',
        arg: 'bar',
        something: 'else'
      }
    };
  });

  it('returns the appropriate object keyed by expected parameters', () => {
    const result = utils.getInput(req, key, params);
    expect(result).toEqual({
      input: 'foo',
      arg: 'bar'
    });
  });

  it('returns parameters from the locals object when passed with input params', () => {
    const locals = { input: 'FOO', arg: 'BAZ', attackValues: 'bad string!' };
    const result = utils.getInput(req, key, params, { locals });
    expect(result).toEqual({
      input: 'FOO',
      arg: 'BAZ'
    });
  });

  it('returns hard-coded values when provided', () => {
    const result = utils.getInput(req, key, params, { noop: true });
    expect(result).toEqual({
      input: 'noop',
      arg: 'noop'
    });
  });
});
