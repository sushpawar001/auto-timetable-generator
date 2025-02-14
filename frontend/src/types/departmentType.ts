export interface DepartmentSettingsType {
    _id: string;
    user_id: string;
    department: string;
    start_time: string;
    end_time: string;
    practical_slots: number[];
    minutes_lecture: number;
}
