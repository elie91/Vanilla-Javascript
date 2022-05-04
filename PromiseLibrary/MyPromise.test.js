const MyPromise = require("./MyPromise.js")
// const MyPromise = Promise

const DEFAULT_VALUE = "default"

describe("then", () => {
  it("with no chaining", () => {
    return promise().then(v => expect(v).toEqual(DEFAULT_VALUE))
  })

  it("with multiple thens for same promise", () => {

  })

  it("with then and catch", () => {

  })

  it("with chaining", () => {

  })
})

describe("catch", () => {
  it("with no chaining", () => {
  })

  it("with multiple catches for same promise", () => {

  })

  it("with chaining", () => {

  })
})

describe("finally", () => {
  it("with no chaining", () => {

  })

  it("with multiple finallys for same promise", () => {

  })

  it("with chaining", () => {

  })
})

describe("static methods", () => {
  it("resolve", () => {

  })

  it("reject", () => {

  })

  describe("all", () => {
    it("with success", () => {

    })

    it("with fail", () => {

    })
  })

  it("allSettled", () => {

  })

  describe("race", () => {
    it("with success", () => {

    })

    it("with fail", () => {

    })
  })

  describe("any", () => {
    it("with success", () => {

    })

    it("with fail", () => {

    })
  })
})

function promise({ value = DEFAULT_VALUE, fail = false } = {}) {
  return new MyPromise((resolve, reject) => {
    fail ? reject(value) : resolve(value)
  })
}