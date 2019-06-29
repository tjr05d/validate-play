const validatePlay = require("../index.js");

describe("validatePlay", () => {
  it("expect validatePlay to be defined", () => {
    expect(validatePlay).toBeDefined();
  });
  it("should be a function", () => {
    expect(typeof validatePlay).toBe("function");
  });
});
