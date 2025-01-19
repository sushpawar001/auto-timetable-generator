type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thurs' | 'Fri' | 'Sat';

interface LectureDetails {
    subject: string;
    subtype: 'Theory';  // Can be expanded if there are other subtypes
    professor: string;
}

interface CourseSchedule {
    [key: string]: {  // Course name (e.g., "FY BAF")
        [K in DayOfWeek]: LectureDetails[];
    };
}

export interface Timetable {
    timetable: CourseSchedule;
}