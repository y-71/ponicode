import { Group } from "../types";

// the roller coaster can be modeled as a state machine
// that passes by different states.
// the states are the different group of groups that succeed to each others
// we call each state a Run
type Run = { 
  /** the earnings in Dirham for the different groups in this Run */
  runEarnings: number; 
  /** the index of the group that starts the next Run */
  nextRunStartIndex: number;
};
/**
 * 
 * @param numberOfPlaces 
 * @param numberOfRidesPerDay 
 * @param numberOfGroups 
 * @param groups 
 * @returns the roller coster earnings for the day in dirhams
 */
export default function calculateRollerCoasterEarnings(
  numberOfPlaces: number,
  numberOfRidesPerDay: number,
  numberOfGroups: number,
  groups: Group[]
): BigInt {
  let earnings: bigint = BigInt(0);
  /**
   * runs maps each group's index to it's corresponding run 
   */
  const runs = new Map<number, Run>();

  let runStartIndex = 0;
  let cycle: number[] = [];

  for (let i = 0; i < numberOfRidesPerDay; i++) {
    let runEarnings = 0;

    // if we recorded the run before, it means that we found a cycle in the state machine's graph
    // and that we know and can compute the next steps of computation
    if (runs.has(runStartIndex)) {
      runEarnings = runs.get(runStartIndex).runEarnings;
      runStartIndex = runs.get(runStartIndex).nextRunStartIndex;

      // we start by finding the cycle:
      if (cycle.length == 0) {
        cycle = findCycle(runs, runStartIndex);
      }

      // we get how many full cycles left from thisy state
      let leftCycles = Math.floor((numberOfRidesPerDay - i) / cycle.length) - 1;
      
      // if we can reduce full cycles, we just increment the earnings by the earnings from 
      // the different cycles and we increment the runs by the number of runs in the full cycles.  
      if (leftCycles > 0) {
        const cycleEarnings = calculateCycleEarnings(runs, cycle);
        earnings += cycleEarnings * BigInt(leftCycles);
        i += leftCycles * cycle.length;
      }
      // we calculate the rest of the runs after running the full cycles
    } else {
      // otherwise we record the current run
      let nextRunStartIndex = runStartIndex;
      for (
        let j = 0;
        j < numberOfGroups &&
        runEarnings + groups[nextRunStartIndex] <= numberOfPlaces;
        j++
      ) {
        runEarnings += groups[nextRunStartIndex];
        nextRunStartIndex = (nextRunStartIndex + 1) % numberOfGroups;
      }
      runs.set(runStartIndex, { runEarnings, nextRunStartIndex });

      // we increment the index to the next state
      runStartIndex = nextRunStartIndex;
    }
    earnings += BigInt(runEarnings);
  }
  return earnings;
}

/**
 * 
 * @param runs the map of the groups and their corresponding runs
 * @param startIndex the index of a run in the cycle
 * @returns an array with the runs indices in the cycle
 */
function findCycle(runs: Map<number, Run>, startIndex: number): number[] {
  let nextCyclerunStartIndex = runs.get(startIndex).nextRunStartIndex;
  const cycle = [startIndex];
  while (nextCyclerunStartIndex != startIndex) {
    cycle.push(nextCyclerunStartIndex);
    nextCyclerunStartIndex = runs.get(nextCyclerunStartIndex).nextRunStartIndex;
  }
  return cycle;
}
/**
 * 
 * @param runs the map of the groups and their corresponding runs
 * @param cycle the run indices in the cycle
 * @returns the earnings from the runs in the cycle 
 */
function calculateCycleEarnings(
  runs: Map<number, Run>,
  cycle: number[]
): bigint {
  let cycleEarnings = BigInt(0);
  cycle.forEach((cycleIndex) => {
    cycleEarnings += BigInt(runs.get(cycleIndex).runEarnings);
  });
  return cycleEarnings;
}
