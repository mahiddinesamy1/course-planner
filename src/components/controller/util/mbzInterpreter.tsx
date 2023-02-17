import {decompressSync, Zippable, zipSync} from 'fflate';
// @ts-ignore
import XMLParser from 'fast-xml-parser';
import { CalEvent, CalEventType } from '@/components/model/calEvent';
import { ArchiveFile } from '@/components/model/archiveFile';

const options = {
    ignoreAttributes : false

};

const xmlParser = new XMLParser.XMLParser(options);

function mbzDateToJS(mbzDate : string): Date{
    return new Date(parseInt(mbzDate, 10) * 1000);
}

function parseMBZQuiz(obj:any, id:string): CalEvent {
    return {start: mbzDateToJS(obj["timeopen"]),
            end: mbzDateToJS(obj["timeclose"]),
            title: obj["name"],
            type: CalEventType.Evaluation,
            uid: id};
}

function parseMBZHomework(obj:any, id:string): CalEvent {
    return {start: mbzDateToJS(obj["allowsubmissionsfromdate"]),
            end: mbzDateToJS(obj["duedate"]),
            title: obj["name"],
            type: CalEventType.Homework,
            uid: id};
}

const mbzActivtiyToCal: {[key: string]: (obj:any, id:string)=>CalEvent } = {
    "quiz": parseMBZQuiz,
    "assign": parseMBZHomework
};

export const zipData = (data:ArchiveFile[]): Uint8Array => {

  const pathToData: Zippable = {};
  for (let file of data) {
    pathToData[file.name] = new Uint8Array(file.buffer);
  }

  const serialized = zipSync(pathToData);

  return serialized;
}

export const extractData = async (file:File): Promise<ArchiveFile[]> => {

    const fileArrayBuffer = await readFileAsUint8Array(file);
    const unzip = decompressSync(fileArrayBuffer);
    // @ts-ignore
    const module = await import('js-untar'); // dynamic import because importing the module on the server-side will result in a exception becasue the module is looking for the window attribute
    const untar = module.default;

    return await untar(unzip.buffer);
    
}

export const parseActivities = async (data:ArchiveFile[]):Promise<CalEvent[]> => {
        const calEvents:CalEvent[] = [];
        const activityPaths: string[] = getActivtyPaths(data);
        
        for (let extractedFile of data) {
            
            if (activityPaths.includes(extractedFile.name)) {
                let activtiyAsJSON = xmlParser.parse(Buffer.from(extractedFile.buffer))["activity"]
                let type = activtiyAsJSON["@_modulename"];
                let id = activtiyAsJSON["@_id"];
                let mappingFcn = mbzActivtiyToCal[type];
                calEvents.push(mappingFcn(activtiyAsJSON[type], id));
            }
        }
        
        return calEvents;
};

function getActivtyPaths(untarFiles: ArchiveFile[]):string[] {
    const mainFile = untarFiles.find((file) => file.name=== "moodle_backup.xml");
    if (mainFile === undefined) {
        throw new Error("No moodle_backup.xml file in provided tar. Make sure to upload a moodle backup file.");
    }
    const mainFileAsJSON = xmlParser.parse(Buffer.from(mainFile.buffer));
    const calTypeToLocation: string[] = [];
    
    for (let activity of mainFileAsJSON["moodle_backup"]["information"]["contents"]["activities"]["activity"] ) {
        let moduleType = activity["modulename"]
        if (moduleType in mbzActivtiyToCal) {
            calTypeToLocation.push(makeMBZpath(activity, moduleType));
        }
    }
    return calTypeToLocation;
}

function makeMBZpath(jsonActivity: any, type: string) {
    return jsonActivity["directory"] + "/" + type + ".xml"; 
}

function readFileAsUint8Array(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  