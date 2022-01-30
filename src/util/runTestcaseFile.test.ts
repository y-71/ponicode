import runTestcaseFile from "./runTestcaseFile";
describe("testing samples", () => {
  test("1: simple case", () => {
    const solution = runTestcaseFile("samples/1_simple_case.txt");
    expect(solution).toBe("7");
  });

  test("2: 1000 groups of few people", () => {
    const solution = runTestcaseFile("samples/2_1000_groups_of_few_people.txt");
    expect(solution).toBe("3935");
  });

  test("3: the same groups go on the ride several times during the day", () => {
    const solution = runTestcaseFile(
      "samples/3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt"
    );
    expect(solution).toBe("15");
  });

  test("4: all the people get on the roller coaster at least once", () => {
    const solution = runTestcaseFile(
      "samples/4_all_the_people_get_on_the_roller_coaster_at_least_once.txt"
    );
    expect(solution).toBe("15000");
  });

  test("5: high earnings during the day", () => {
    const solution = runTestcaseFile("samples/5_high_earnings_during_the_day.txt");
    expect(solution).toBe("4999975000");
  });

  test("6: works with a large dataset", () => {
    const solution = runTestcaseFile("samples/6_works_with_a_large_dataset.txt");
    expect(solution).toBe("89744892565569");
  });

  test("7: hard", () => {
    const solution = runTestcaseFile("samples/7_hard.txt");
    expect(solution).toBe("8974489271113753");
  });

  test("8: harder", () => {
    const solution = runTestcaseFile("samples/8_harder.txt");
    expect(solution).toBe("89744892714152289");
  });
});
