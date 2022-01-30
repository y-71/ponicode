import * as fs from 'fs';
import {Input, Group} from '../types';

/**
 * 
 * @param testcase path to the testcase
 * @returns a valid Input
 */
export default function readTestcaseFile (testcaseFile:string):Input{
    const data = fs.readFileSync(testcaseFile).toString()
    return parseTestCase(data);
}
/**
 * 
 * @param data string 
 * @returns a valid Input
 */
export function parseTestCase(data: string):Input{
    const lines = data.split('\n').filter(item => item);
    
    if(lines.length==0){
        throw "Unvalid Input: file is empty";
    }
    
    /**
     * reading first line parameters
     */
    const [numberOfPlaces,numberOfRidesPerDay,numberOfGroups] = lines[0].split(' ').map(item => parseValidNumber(item));

    /**
     * reading groups
     */
    lines.shift();
    const groups:Group[]= lines.map(
        (group)=> parseValidNumber(group) as Group
    )
    if (groups.length!=numberOfGroups){
        throw new Error("Unvalid Input: unvalid number of groups");
    }
    
    /**
     * constructing Input object
     */
    const input:Input ={
        numberOfPlaces,
        numberOfRidesPerDay,
        numberOfGroups,
        groups
    }
    
    return input
}

/**
 * parses the string number 
 * and throws an error if it's negative
 * @param item the parsed number as a string 
 * @returns the parsed number as a number  
 */
function parseValidNumber (item:string):number{
    const parsedNumber = parseInt(item)
    if(parsedNumber < 0){
        throw new Error("Unvalid Input: a negative entry was provided");
    }
    return parsedNumber
}