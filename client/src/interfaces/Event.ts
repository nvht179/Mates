interface Event {
  eventID: number;
  title: string;
  description: string;
  repeatTime: string;
  startTime: string;
  endTime: string;
  classID: number;
}

interface ViewAllEventRequest {
  userID: number;
}

interface ViewAllEventResponse {
  message: string;
  events: {
    eventID: number;
    title: string;
    description: string;
    repeatTime: string;
    startTime: string;
    endTime: string;
    classID: number;
  }[];
}

export type {ViewAllEventRequest, ViewAllEventResponse, Event};