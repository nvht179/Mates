interface Notification {
  id: number;
  title: string;
  content: string;
  type: string;
  targetId: number;
  postId: number;
  commentId: number;
  assignmentId: number;
  createdAt: string;
  statusRead: boolean;
}

interface ViewNotificationRequest {
  userId: number;
}

interface ViewNotificationResponse {
  message: string;
  notifications: Notification[];
}

interface DeleteNotificationRequest {
  notificationId: number;
}

interface DeleteNotificationResponse {
  message: string;
}

interface MarkAsReadRequest {
  notificationId: number;
}

interface MarkAsReadResponse {
  message: string;
}

export type {
  Notification,
  ViewNotificationRequest,
  ViewNotificationResponse,
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  MarkAsReadRequest,
  MarkAsReadResponse,
};
