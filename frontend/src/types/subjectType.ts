export interface Subject {
    _id: string;
    subject: string;
    professor: string;
    department: string;
    college_year: string;
    subject_type: string;
    workload: number;
    remaining_workload?: number;
    user_id: string;
}