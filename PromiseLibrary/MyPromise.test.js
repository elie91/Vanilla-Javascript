// const MyPromise = require('./MyPromise');
const MyPromise = Promise;

const DEFAULT_VALUE = "default";

describe("then", () => {

  it("with no chaining", () => {
    return promise().then(v => expect(v).toEqual(DEFAULT_VALUE));
  });

  // With chaining
  // With then and catch
  // Multiple then

});

describe("catch", () => {

});

describe("finally", () => {

});

describe("static methods", () => {

  it("resolve", () => {

  });

  it("reject", () => {

  });

  it("all", () => {

  });

  it("race", () => {

  });

  it("allSettled", () => {

  });

});


function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
  return new Promise((resolve, reject) => {
    fail ? reject(value) : resolve(value);
  })
}

