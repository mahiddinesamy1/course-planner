export interface CalEvent {
    start: Date;
    end: Date;
    title: string;
    description: string;
    type: CalEventType;
    location: string;
    uid: string;
}

export enum CalEventType {
    Seminar,
    Laboratories,
    Evaluation,
    Homework,
    Undefined
}