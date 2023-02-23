import {describe, expect, test} from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import {mapICALtoEvent} from '@/components/controller/util/eventOperations'
import { CalEvent, CalEventType } from '@/components/model/interfaces/events/calEvent';

const dataPath = "__tests__/data/ical";

const jsonExpectedResultToType: {[key: string]: CalEventType} = {
  "laboratories": CalEventType.Laboratories,
  "seminars": CalEventType.Seminar
};

const jsonExpectedResultFieldToCalField: {[key: string]: string} = {
  "startDate": "start",
  "endDate": "end"
}

async function getTestString(folder:string, filename:string):Promise<string> {
  const data = await fs.promises.readFile(path.join(dataPath, folder, filename));
  return data.toString();
}

function eventEqualExpected(expectedResult: any, toTest: CalEvent):boolean {
  let isEqual = true;
  for (let expectedField in jsonExpectedResultFieldToCalField) {
    // @ts-ignore
    isEqual = isEqual && JSON.stringify(toTest[jsonExpectedResultFieldToCalField[expectedField]]) === JSON.stringify(expectedResult[expectedField]);

    }

  return isEqual;
}

describe('ICAL module', () => {
  /**
   * Test that ICAL parser produces an equal number of events than the expected result and that 
   * every event in the expected result has an event with equal starting time and ending time in the
   * produced CalEvents.
   */
  test('parses ICAL full course data', async () => {
    const icsData = await getTestString("full", "data.ics");
    const parsedEvents = mapICALtoEvent(icsData);
    const expectedResultData:any = await getTestString("full", "result.json");
    const expectedResult = JSON.parse(expectedResultData);
    let resultNumEvent = 0;
    console.log(parsedEvents)
    for (let expectedResultCollection in jsonExpectedResultToType) {
      let expectedType = jsonExpectedResultToType[expectedResultCollection];
      for (let expectedEvent of expectedResult[expectedResultCollection]) {
        resultNumEvent++;
        let found = parsedEvents.find((event: CalEvent)=> eventEqualExpected(expectedEvent, event));
        console.log(expectedEvent);
        expect(found).toBeDefined();
        expect(found?.type).toBe(expectedType);
      }
        
    }
    expect(parsedEvents.length).toBe(resultNumEvent);
  });
});
