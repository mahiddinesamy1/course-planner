// @ts-ignore
import * as Pako from 'pako';
// @ts-ignore
import XMLParser from 'fast-xml-parser';
import { CalEvent, CalEventType } from '@/components/model/calEvent';
interface UntarFile {
    buffer : ArrayBuffer,
    type : string,
    name : string,
    namePrefix : string,
    uname : string,
    uid: number,
    ustarFromat: string,
    version : string,
    checksum : number
}

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
            description: "",
            type: CalEventType.Evaluation,
            location: "",
            uid: id};
}

function parseMBZHomework(obj:any, id:string): CalEvent {
    return {start: mbzDateToJS(obj["allowsubmissionsfromdate"]),
            end: mbzDateToJS(obj["duedate"]),
            title: obj["name"],
            description: "",
            type: CalEventType.Homework,
            location: "",
            uid: id};
}

const mbzActivtiyToCal: {[key: string]: (obj:any, id:string)=>CalEvent } = {
    "quiz": parseMBZQuiz,
    "assign": parseMBZHomework
};

export const parseActivities = async (file:File):Promise<CalEvent[]> => {
        const calEvents:CalEvent[] = [];
        if (typeof window !== 'undefined') {
            const fileArrayBuffer = await fileToArrayBuffer(file);
            const unzip = Pako.ungzip(fileArrayBuffer);
            // @ts-ignore
            const module = await import('js-untar') // dynamic import because importing the module on the server-side will result in a exception becasue the module is looking for the window attribute
            const untar = module.default;

            const extractedFiles = await untar(unzip.buffer)
            const activityPaths: string[] = getActivtyPaths(extractedFiles);
            
            for (let extractedFile of extractedFiles) {
                
                if (activityPaths.includes(extractedFile.name)) {
                    let activtiyAsJSON = xmlParser.parse(Buffer.from(extractedFile.buffer))["activity"]
                    let type = activtiyAsJSON["@_modulename"];
                    let id = activtiyAsJSON["@_id"];
                    let mappingFcn = mbzActivtiyToCal[type];
                    calEvents.push(mappingFcn(activtiyAsJSON[type], id));
                }
            }
        }
        return calEvents;
};

function getActivtyPaths(untarFiles: UntarFile[]):string[] {
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

function fileToArrayBuffer(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  