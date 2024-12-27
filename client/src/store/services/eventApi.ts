import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";
import {
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
  EditEventRequest,
  EditEventResponse,
  ViewAllEventRequest,
  ViewAllEventResponse,
} from "../../interfaces/Event";

type Tag = { type: "Event" | "UserEvent"; id: string | number };

export const eventApi = createApi({
  reducerPath: "event",
  tagTypes: ["Event", "UserEvent"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewAllEvent: builder.query<ViewAllEventResponse, ViewAllEventRequest>({
      providesTags: (result, _error, arg) => {
        const tags: Tag[] = (result?.events ?? []).map((event) => ({
          type: "Event" as const,
          id: event.eventID,
        }));
        tags.push({ type: "UserEvent" as const, id: arg.userID });
        return tags;
      },
      query: (user) => {
        return {
          url: `/events/view-event-by-userID/${user.userID}`,
          params: {
            userID: user.userID,
          },
          method: "GET",
        };
      },
    }),
    createEvent: builder.mutation<CreateEventResponse, CreateEventRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "UserEvent", id: arg.personID },
      ],
      query: (newEvent) => {
        return {
          url: "/events/create",
          method: "POST",
          body: newEvent,
        };
      },
    }),
    editEvent: builder.mutation<EditEventResponse, EditEventRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Event", id: arg.eventID },
      ],
      query: (newEvent) => {
        return {
          url: "/events/update-event",
          method: "PUT",
          body: newEvent,
        };
      },
    }),
    deleteEvent: builder.mutation<DeleteEventResponse, DeleteEventRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Event", id: arg.eventID },
      ],
      query: (event) => {
        return {
          url: `/events/delete-event/${event.eventID}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useViewAllEventQuery,
  useCreateEventMutation,
  useEditEventMutation,
  useDeleteEventMutation,
} = eventApi;
export default eventApi;
