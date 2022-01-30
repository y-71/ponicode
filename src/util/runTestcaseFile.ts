import readTestcaseFile from "./readTestcaseFile";
import calculateRollerCoasterEarnings from "./calculateRollerCoasterEarnings";

/**
 * 
 * @param testcaseFile the path to the testcase file
 * @returns the earnings in the situation in dirhams 
 */
export default function runTestcaseFile(testcaseFile: string): string {
  const { numberOfPlaces, numberOfRidesPerDay, numberOfGroups, groups } =
    readTestcaseFile(testcaseFile);

  return calculateRollerCoasterEarnings(
    numberOfPlaces,
    numberOfRidesPerDay,
    numberOfGroups,
    groups
  ).toString();
}
