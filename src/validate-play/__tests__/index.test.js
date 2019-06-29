const validatePlay = require("../index.js");

describe("validatePlay", () => {
  it("expect validatePlay to be defined", () => {
    expect(validatePlay).toBeDefined();
  });
  it("should be a function", () => {
    expect(typeof validatePlay).toBe("function");
  });

  describe("invalid inputs - should return false", () => {
    describe("invalid runs scored", () => {
      it("greater than 4", () => {
        const res = validatePlay(0, [], 0, [], 5);
        expect(res).toBeFalsy();
      });

      it("less than 0", () => {
        const res = validatePlay(0, [], 0, [], -3);
        expect(res).toBeFalsy();
      });

      it("is not a number", () => {
        const res = validatePlay(0, [], 0, [], "1");
        expect(res).toBeFalsy();
      });
    });

    describe("invalid initialBaserunner", () => {
      it("not an array", () => {
        const res = validatePlay(0, "[]", 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("values in array are not numbers", () => {
        const res = validatePlay(0, [1, "3"], 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("values exist below 1", () => {
        const res = validatePlay(0, [0, 1], 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("values exist above 4", () => {
        const res = validatePlay(0, [1, 3, 4], 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("duplicate values exist for a base", () => {
        const res = validatePlay(0, [1, 1, 3], 0, [], 1);
        expect(res).toBeFalsy();
      });
    });

    describe("invalid initialOuts", () => {
      it("not a number", () => {
        const res = validatePlay("0", [1, 3], 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("less than 0", () => {
        const res = validatePlay(-1, [1, 3], 0, [], 1);
        expect(res).toBeFalsy();
      });

      it("greater than 2", () => {
        const res = validatePlay(3, [1, 3], 0, [], 1);
        expect(res).toBeFalsy();
      });
    });

    describe("invalid final outs", () => {
      it("not a number", () => {
        const res = validatePlay(0, [1, 3], "0", [], 1);
        expect(res).toBeFalsy();
      });

      it("less than 0", () => {
        const res = validatePlay(0, [1, 3], -1, [], 1);
        expect(res).toBeFalsy();
      });

      it("greater than 3", () => {
        const res = validatePlay(0, [1, 3], 4, [], 1);
        expect(res).toBeFalsy();
      });
    });

    describe("invalid finalBaserunners", () => {
      it("not an array", () => {
        const res = validatePlay(0, [], 0, "[]", 1);
        expect(res).toBeFalsy();
      });

      it("values in array are not numbers", () => {
        const res = validatePlay(0, [], 0, ["1"], 1);
        expect(res).toBeFalsy();
      });

      it("values exist below 1", () => {
        const res = validatePlay(0, [], 0, [-1], 1);
        expect(res).toBeFalsy();
      });

      it("values exist above 4", () => {
        const res = validatePlay(0, [1], 0, [4], 1);
        expect(res).toBeFalsy();
      });

      it("duplicate values exist for a base", () => {
        const res = validatePlay(0, [1], 0, [2, 2], 1);
        expect(res).toBeFalsy();
      });
    });
  });
});
