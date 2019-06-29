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

  describe("invalid situations", () => {
    it("outs should never decrease", () => {
      const res = validatePlay(2, [1], 1, [], 3);
      expect(res).toBeFalsy();
    });
    describe("runs scored", () => {
      it("runs scored cannot exceed initial baserunnners + 1", () => {
        const res = validatePlay(0, [1], 0, [], 3);
        expect(res).toBeFalsy();
      });

      it("runs scored + outs cannout exceed baserunners +1", () => {
        const res = validatePlay(0, [1, 3], 2, [], 2);
        expect(res).toBeFalsy();
      });
    });

    describe("baserunner outcomes", () => {
      describe("baserunners have decreased", () => {
        it("runs are not scored, outs have not increased", () => {
          const res = validatePlay(0, [1], 0, [], 0);
          expect(res).toBeFalsy();
        });

        it("runs are not scored, outs increase by more than baserunners lost + 1(batter)", () => {
          const res = validatePlay(0, [1, 2], 1, [], 0);
          expect(res).toBeFalsy();
        });
      });

      describe("baserunners have increased", () => {
        it("no runs have scored", () => {
          const res = validatePlay(0, [1], 0, [1, 2], 1);
          expect(res).toBeFalsy();
        });

        it("no outs have been made", () => {
          const res = validatePlay(0, [1], 1, [1, 2], 0);
          expect(res).toBeFalsy();
        });

        it("cannot increase by more than the current runners + 1", () => {
          const res = validatePlay(0, [], 0, [1, 2], 0);
          expect(res).toBeFalsy();
        });
      });
    });

    describe("inning cannot end", () => {
      it("cannot increase by more than the current runners + 1", () => {
        const res = validatePlay(2, [1, 2], 3, [1], 1);
        expect(res).toBeTruthy();
      });
    });
  });

  describe("example test cases", () => {
    it("0 outs, runner on 1st -> 0 outs, runners on 1st and 3rd, 0 runs scored", () => {
      const res = validatePlay(0, [1], 0, [1, 3], 0);
      expect(res).toBeTruthy();
    });

    it("1 out, runner on 3rd -> 2 outs, base empty, 1 runs scored", () => {
      const res = validatePlay(1, [3], 2, [], 1);
      expect(res).toBeTruthy();
    });

    it("2 outs, base empty -> 3 outs, 0 runs scored", () => {
      const res = validatePlay(2, [], 3, [], 0);
      expect(res).toBeTruthy();
    });

    it("0 outs, runner on 1st, -> 0 outs, bases loaded, 0 runs scored", () => {
      const res = validatePlay(0, [1], 0, [1, 2, 3], 0);
      expect(res).toBeFalsy();
    });

    it("0 outs, runner on 1st -> 1 out runner on 2nd, 0 runs scored", () => {
      const res = validatePlay(0, [1], 1, [2], 0);
      expect(res).toBeTruthy();
    });

    it("2 outs, bases loaded -> 2 outs, bases loaded, 1 run scored", () => {
      const res = validatePlay(2, [1, 2, 3], 2, [1, 2, 3], 1);
      expect(res).toBeTruthy();
    });

    it("2 outs, bases loaded -> 2 outs, bases loaded, 2 runs scored", () => {
      const res = validatePlay(2, [1, 2, 3], 2, [1, 2, 3], 2);
      expect(res).toBeFalsy();
    });

    it("0 outs, bases loaded -> 2 outs, bases loaded, 1 runs scored", () => {
      const res = validatePlay(2, [1, 2, 3], 2, [1, 2, 3], 2);
      expect(res).toBeFalsy();
    });

    describe("double play", () => {
      it("0 outs, bases loaded -> 2 outs, runner on 3rd, 1 runs scored", () => {
        const res = validatePlay(0, [1, 2, 3], 2, [3], 1);
        expect(res).toBeTruthy();
      });

      it("0 outs, bases loaded -> 2 outs, runners on 1st and 3rd, 1 runs scored", () => {
        const res = validatePlay(0, [1, 2, 3], 2, [1, 3], 1);
        expect(res).toBeFalsy();
      });
    });

    describe("triple play", () => {
      it("0 outs, runners on 1st and 2nd -> 3 outs, bases empty, 0 runs scored", () => {
        const res = validatePlay(0, [1, 2], 3, [], 0);
        expect(res).toBeTruthy();
      });

      it("0 outs, runners on 1st and 2nd -> 3 outs, bases empty, 0 runs scored", () => {
        const res = validatePlay(0, [1], 3, [], 0);
        expect(res).toBeFalsy();
      });
    });

    describe("home runs", () => {
      describe("solo homer", () => {
        it("0 outs, bases empty -> 0 outs, bases empty, 1 run scored", () => {
          const res = validatePlay(0, [], 0, [], 1);
          expect(res).toBeTruthy();
        });

        it("1 out, bases empty -> 1 out, bases empty, 1 run scored", () => {
          const res = validatePlay(1, [], 1, [], 1);
          expect(res).toBeTruthy();
        });

        it("2 outs, bases empty -> 2 outs, bases empty, 1 run scored", () => {
          const res = validatePlay(2, [], 2, [], 1);
          expect(res).toBeTruthy();
        });
      });

      describe("2 run home runs", () => {
        it("0 outs, runner on base-> 0 outs, bases empty, 2 run scored", () => {
          expect(validatePlay(0, [1], 0, [], 2)).toBeTruthy();
          expect(validatePlay(0, [2], 0, [], 2)).toBeTruthy();
          expect(validatePlay(0, [3], 0, [], 2)).toBeTruthy();
        });

        it("1 out, runner on base-> 1 outs, bases empty, 2 run scored", () => {
          expect(validatePlay(1, [1], 1, [], 2)).toBeTruthy();
          expect(validatePlay(1, [2], 1, [], 2)).toBeTruthy();
          expect(validatePlay(1, [3], 1, [], 2)).toBeTruthy();
        });

        it("2 out, runner on base-> 2 outs, bases empty, 2 run scored", () => {
          expect(validatePlay(2, [1], 2, [], 2)).toBeTruthy();
          expect(validatePlay(2, [2], 2, [], 2)).toBeTruthy();
          expect(validatePlay(2, [3], 2, [], 2)).toBeTruthy();
        });
      });

      describe("3 run home runs", () => {
        it("0 outs, runners on base-> 0 outs, bases empty, 3 run scored", () => {
          expect(validatePlay(0, [1, 2], 0, [], 3)).toBeTruthy();
          expect(validatePlay(0, [1, 3], 0, [], 3)).toBeTruthy();
          expect(validatePlay(0, [2, 3], 0, [], 3)).toBeTruthy();
        });

        it("1 outs, runners on base-> 1 outs, bases empty, 3 run scored", () => {
          expect(validatePlay(1, [1, 2], 1, [], 3)).toBeTruthy();
          expect(validatePlay(1, [1, 3], 1, [], 3)).toBeTruthy();
          expect(validatePlay(1, [2, 3], 1, [], 3)).toBeTruthy();
        });

        it("2 outs, runners on base-> 2 outs, bases empty, 3 run scored", () => {
          expect(validatePlay(2, [1, 2], 2, [], 3)).toBeTruthy();
          expect(validatePlay(2, [1, 3], 2, [], 3)).toBeTruthy();
          expect(validatePlay(2, [2, 3], 2, [], 3)).toBeTruthy();
        });
      });

      describe("grand slam", () => {
        it("0 outs, base loaded -> 0 outs, bases empty, 2 run scored", () => {
          expect(validatePlay(0, [1, 2, 3], 0, [], 4)).toBeTruthy();
        });
      });

      describe("walk, HBP, or single", () => {
        it("0 outs, base empty -> 0 outs, runner on 1st, 0 runs scored", () => {
          expect(validatePlay(0, [], 0, [1], 0)).toBeTruthy();
        });

        it("0 outs, runner on first -> 0 outs, runner on 1st and second, 0 runs scored", () => {
          expect(validatePlay(0, [1], 0, [1, 2], 0)).toBeTruthy();
        });
      });
    });
  });
});
