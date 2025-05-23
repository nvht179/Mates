import { createApi } from "@reduxjs/toolkit/query/react";
import {
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  MarkAsReadRequest,
  MarkAsReadResponse,
  ViewNotificationRequest,
  ViewNotificationResponse,
} from "../../interfaces/Notification";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";

const notiApi = createApi({
  reducerPath: "noti",
  tagTypes: ["Notification"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewNotifications: builder.query<
      ViewNotificationResponse,
      ViewNotificationRequest
    >({
      providesTags: (result) => {
        return (result?.notifications ?? []).map((noti) => ({
          type: "Notification" as const,
          id: noti.id,
        }));
      },
      query: (user) => {
        return {
          url: `/notifications/view-all/${user.userId}`,
          params: {
            userId: user.userId,
          },
          method: "GET",
        };
      },
    }),
    deleteNotification: builder.mutation<
      DeleteNotificationResponse,
      DeleteNotificationRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Notification", id: arg.notificationId },
      ],
      query: (notification) => {
        return {
          url: `/notifications/remove/${notification.notificationId}`,
          params: {
            notificationId: notification.notificationId,
          },
          method: "DELETE",
        };
      },
    }),
    markAsreadNotification: builder.mutation<
      MarkAsReadResponse,
      MarkAsReadRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Notification", id: arg.notificationId },
      ],
      query: (notification) => {
        return {
          url: `/notifications/mark-as-read/${notification.notificationId}/mark-as-read`,
          params: {
            notificationId: notification.notificationId,
          },
          method: "PUT",
        };
      },
    }),
    markAsUnreadNotification: builder.mutation<
      MarkAsReadResponse,
      MarkAsReadRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Notification", id: arg.notificationId },
      ],
      query: (notification) => {
        return {
          url: `/notifications/mark-as-unread/${notification.notificationId}/mark-as-unread`,
          params: {
            notificationId: notification.notificationId,
          },
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useLazyViewNotificationsQuery,
  useDeleteNotificationMutation,
  useMarkAsreadNotificationMutation,
  useMarkAsUnreadNotificationMutation,
} = notiApi;
export default notiApi;
