```mermaid
erDiagram
    Notification {
        integer notificationID PK
        varchar title
        timestamp createTime
        integer type
    }

    Notification_Person {
        integer notificationID PK
        integer personID PK
    }

    Person {
        integer id PK
        varchar name
        varchar email
        varchar password
        varchar phone
        varchar avatar
    }

    Student {
        integer studentID PK
    }

    Class {
        integer classID PK
        varchar name
        varchar code
        varchar description
        integer eventID
    }

    Student_Class {
        integer classID PK
        integer studentID PK
    }

    Teacher {
        integer teacherID PK
    }

    Teacher_Class {
        integer classID PK
        integer teacherID PK
        varchar role
    }

    Parent {
        integer parentID PK
        integer studentID PK
    }

    GradeDetail {
        integer gradeID PK
        integer assignmentID
        integer classID
        integer studentID
        integer grade100
        varchar comment
    }

    Assignment {
        integer assignmentID PK
        integer eventID
        integer weight
        varchar title
        varchar desc
        integer notificationID
        integer attachmentID
    }

    Post {
        integer postID PK
        integer classID
        varchar title
        varchar content
        integer notificationID
        varchar comment
        integer attachmentID
    }

    Attachment {
        integer attachmentID PK
        link link
        varchar linkTitle
        file file
    }

    Event {
        integer eventID PK
        varchar title
        varchar description
        integer repeatType
        integer repeatTime
    }

    Period {
        integer periodID PK
        integer eventID PK
        timestamp startTime
        timestamp endTime
    }

    Reaction {
        integer postID PK
        integer personID PK
        integer type
    }

    Event_Person {
        integer eventID PK
        integer personID PK
    }

    Lecture {
        integer LectureID PK
        integer classID PK
        varchar title
        varchar content
        integer attachmentID
    }

    Student ||--|| Person : "studentID-id"
    Student ||--|{ Student_Class : "studentID"
    Class ||--|{ Student_Class : "classID"
    Teacher ||--|| Person : "teacherID-id"
    Teacher ||--|{ Teacher_Class : "teacherID"
    Teacher_Class }|--|| Class : "classID"
    Parent ||--|| Student : "studentID"
    Assignment ||--|{ GradeDetail : "assignmentID"
    Parent ||--|| Person : "parentID-id"
    GradeDetail }|--|| Student : "studentID"
    GradeDetail }|--|| Class : "classID"
    Post ||--|| Attachment : "attachmentID"
    Post ||--|{ Reaction : "postID"
    Reaction }|--|| Person : "personID"
    Notification ||--|{ Notification_Person : "notificationID"
    Person ||--|{ Notification_Person : "id-personID"
    Attachment ||--|| Assignment : "attachmentID"
    Notification ||--|| Post : "notificationID"
    Notification ||--|| Assignment : "notificationID"
    Assignment }|--|| Event : "eventID"
    Post }|--|| Class : "classID"
    Person ||--|{ Event_Person : "id-personID"
    Event ||--|{ Event_Person : "eventID"
    Period }|--|| Event : "eventID"
    Lecture }|--|| Class : "classID"
    Lecture ||--|| Attachment : "attachmentID"
```