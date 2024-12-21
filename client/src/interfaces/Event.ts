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

interface CreateEventRequest {
  title: string;
  description: string;
  repeatTime: string;
  startTime: string;
  endTime: string;
  personID: number;
}

interface CreateEventResponse {
  message: string;
  event: {
    eventID: number;
    title: string;
    description: string;
    repeatTime: string;
    startTime: string;
    endTime: string;
    classID: number;
  };
  event_person: {
    id: number;
    eventID: number;
    personID: number;
  };
}

interface EditEventRequest {
  eventID: number;
  title: string;
  description: string;
  repeatTime: string;
  startTime: string;
  endTime: string;
}

interface EditEventResponse {
  message: string;
  event: {
    eventID: number;
    title: string;
    description: string;
    repeatTime: string;
    startTime: string;
    endTime: string;
    classID: number;
  };
}

interface DeleteEventRequest {
  eventID: number;
}

interface DeleteEventResponse {
  message: string;
}

export type {
  Event,
  ViewAllEventRequest,
  ViewAllEventResponse,
  CreateEventRequest,
  CreateEventResponse,
  EditEventRequest,
  EditEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
};
