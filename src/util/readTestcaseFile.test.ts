import {parseTestCase} from "./readTestcaseFile"

describe("parseTestCase", () => {
  it("should throw an error if the file is empty", () => {
    expect(() => parseTestCase("\n\n")).toThrow(
      new Error("Unvalid Input: file is empty")
    );
  });
  it("should throw an error if a number is negative", () => {
    expect(() => parseTestCase("-2 1 1" + "\n" + "2" + "\n")).toThrow(
      new Error("Unvalid Input: a negative entry was provided")
    );
  });

  it("should throw an error if the wrong number of groups is provided", () => {
    expect(() => parseTestCase("2 1 1" + "\n" + "2" + "\n" + "2")).toThrow(
      new Error("Unvalid Input: unvalid number of groups")
    );
  });

  it("parse input if it is valid", () => {
    expect(parseTestCase("2 1 1" + "\n" + "2")).toStrictEqual({
      numberOfPlaces: 2,
      numberOfRidesPerDay: 1,
      numberOfGroups: 1,
      groups: [2],
    });
  });
});
