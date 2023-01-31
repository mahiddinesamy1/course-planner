interface Event {
    start: moment.Moment;
    end: moment.Moment;
    title: string;
    description: string;
    location: string;
    uid: string;
}

export default Event;