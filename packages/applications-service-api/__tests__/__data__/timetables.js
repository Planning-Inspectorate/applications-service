const TIMETABLES_RESPONSE_DATA = [
    {
        id: 1,
        uniqueId: "WS010006-34601",
        caseReference: "EN010009",
        title: "Deadline 1A",
        description: "The ExA is under a duty to complete the Examination of the application by the end of the period of six months",
        dateOfEvent: "2020-02-19 11:21:42",
        timetableType: "Exams",
        typeOfEvent: "Deadline",
        location: null,
        dateCreated: "2020-02-16 11:21:42",
        dateLastModified: "2020-04-16 15:44:52",
        dateTimeDeadlineStart: "2020-05-16 15:44:52",
        sourceSystem: "Horizon"
    },
    {
        id: 2,
        uniqueId: "WS010006-34602",
        caseReference: "EN010009",
        title: "Deadline 2",
        description: "Pre examination for the application by the end of the period of six months",
        dateOfEvent: "2020-08-19 11:21:42",
        timetableType: "Exams",
        typeOfEvent: "Deadline",
        location: null,
        dateCreated: "2020-02-16 11:21:42",
        dateLastModified: "2020-04-16 15:44:52",
        dateTimeDeadlineStart: "2020-05-16 15:44:52",
        sourceSystem: "Horizon"
    }
];

const TIMETABLES_DB_DATA = [
    {
        id: 1,
        unique_id: "WS010006-34601",
        case_reference: "EN010009",
        title: "Deadline 1A",
        description: "The ExA is under a duty to complete the Examination of the application by the end of the period of six months",
        date_of_event: "2020-02-19 11:21:42",
        timetable_type: "Exams",
        type_of_event: "Deadline",
        location: null,
        date_created: "2020-02-16 11:21:42",
        date_last_modified: "2020-04-16 15:44:52",
        dateTimeDeadlineStart: "2020-05-16 15:44:52",
        sourceSystem: "Horizon"
    },
    {
        id: 2,
        unique_id: "WS010006-34602",
        case_reference: "EN010009",
        title: "Deadline 2",
        description: "Pre examination for the application by the end of the period of six months",
        date_of_event: "2020-08-19 11:21:42",
        timetable_type: "Exams",
        type_of_event: "Deadline",
        location: null,
        date_created: "2020-02-16 11:21:42",
        date_last_modified: "2020-04-16 15:44:52",
        dateTimeDeadlineStart: "2020-05-16 15:44:52",
        sourceSystem: "Horizon"
    }
];

module.exports = {
    TIMETABLES_RESPONSE_DATA,
    TIMETABLES_DB_DATA
}