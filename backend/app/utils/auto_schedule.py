import datetime as dt


def create_timetable_struct(all_years: list[str]) -> dict[str, dict[str, list]]:
    timetable_struct: dict[str, list] = {
        "Mon": [],
        "Tue": [],
        "Wed": [],
        "Thurs": [],
        "Fri": [],
        "Sat": [],
    }

    return {year: {day: [] for day in timetable_struct} for year in all_years}


def get_all_years_with_optionals(
    professor_dict: dict[str, dict[str, list]]
) -> list[str]:
    """
    Returns a sorted list according to the number of optionals in all years.
    """
    year_dict: dict[str, int] = {}

    for year in professor_dict.values():
        for year_name, sub_list in year.items():
            if year_name not in year_dict:
                year_dict[year_name] = 0

            for subject in sub_list:
                if "Options" in subject:
                    year_dict[year_name] += 1

    sorted_year_items = sorted(year_dict.items(), key=lambda x: x[1], reverse=True)
    sorted_years = [key for key, value in sorted_year_items]

    return sorted_years


def get_all_departments(settings: dict[str, dict]) -> list[str]:
    """
    Returns a sorted list of all departments.
    """
    return sorted(list(settings.keys()))


def auto_schedule(
    professor_dict: dict[str, dict[str, list]],
    # all_years: list[str],
    settings: dict[str, dict],
    # all_departments: list[str],
):
    """
    Generate a timetable schedule based on the availability of professors
    """
    all_years = get_all_years_with_optionals(professor_dict)
    print(f"{all_years = }")
    ttlist = create_timetable_struct(all_years)
    # print(f"{ttlist = }")

    all_departments = get_all_departments(settings)
    # print(f"{all_departments = }")

    for year in all_years:
        generate_year_wise_schedule(
            year, professor_dict, all_departments, ttlist, settings
        )

    print(f"{ttlist = }")
    return ttlist


def generate_year_wise_schedule(
    year: str,
    professor_dict: dict[str, dict[str, list]],
    all_departments: list[str],
    ttlist: dict[str, dict[str, list]],
    settings: dict[str, dict],
) -> None:

    department: str = get_department_by_year(year, all_departments)
    start_time, end_time, minutes_lecture = get_department_time(department, settings)
    no_of_lectures = calc_college_time(start_time, end_time, minutes_lecture)
    practical_slots = get_practical_slots_by_department(department, settings)
    professors_queue = get_professors_by_year(professor_dict, year)

    for lec_num in range(no_of_lectures):
        generate_daily_schedule(
            year, lec_num, professors_queue, practical_slots, ttlist, professor_dict
        )


def get_department_by_year(year: str, all_departments: list[str]) -> str:
    """
    Returns the department associated with a given year.

    Returns:
        str: The department associated with the given year.
    """

    for department in all_departments:
        if department in year:
            return department
    return ""


def get_department_time(
    department: str, settings: dict[str, dict]
) -> tuple[dt.datetime, dt.datetime, int]:
    """
    Retrieves the start time, end time, and duration of a lecture
    for a given department from settings.
    """
    today: dt.datetime = dt.datetime.now()
    minutes_lecture: int = settings[department]["minutes_lecture"]
    start_time = dt.datetime.strptime(settings[department]["start_time"], "%H:%M")
    end_time = dt.datetime.strptime(settings[department]["end_time"], "%H:%M")

    start_time = dt.datetime.combine(today.date(), start_time.time())
    end_time = dt.datetime.combine(today.date(), end_time.time())

    return start_time, end_time, minutes_lecture


def calc_college_time(
    start_time: dt.datetime, end_time: dt.datetime, minutes_lecture: float
) -> int:
    """
    Calculates the total number of college minutes between a start time and an end time,
    given the duration of each lecture in minutes.
    """
    print(f"{start_time = }")
    print(f"{end_time = }")
    print(f"{minutes_lecture = }")
    college_time = end_time - start_time
    minutesofcollege = college_time.total_seconds() / 60.0
    return int(minutesofcollege // minutes_lecture)


def get_practical_slots_by_department(
    department: str, settings: dict[str, dict]
) -> list[int]:
    """
    Retrieves the practical slots for a given department from settings.
    """

    return settings[department]["practical_slots"]


def get_professors_by_year(
    professors_dict: dict[str, dict[str, list]], year: str
) -> list[str]:
    """
    Given a dictionary of professors and year,
    return a list of professors that teach to the given year
    """

    professors = []
    for prof in professors_dict.keys():
        if year in professors_dict[prof].keys():
            professors.append(prof)

    return professors


def generate_daily_schedule(
    year: str,
    lec_num: int,
    professors_queue: list[str],
    practical_slots: list,
    ttlist: dict[str, dict[str, list]],
    profs: dict[str, dict[str, list]],
) -> None:
    queue_len = len(professors_queue)
    days = list(ttlist[year].keys())
    number_of_days = len(days)
    day_num = 0
    count = 0
    attepts = 0
    pract_attepts = 0

    def queue_next():
        professors_queue.append(professors_queue.pop(0))

    while day_num < number_of_days and count < 100:
        count += 1
        available_prof = check_professor_available(
            lec_num, days[day_num], ttlist, profs
        )
        today_lecs = get_professors_from_schedule(year, days[day_num], ttlist)
        can_scheduled, is_prof_available = check_scheduling_conditions(
            professors_queue[0], today_lecs, lec_num, queue_len, attepts, available_prof
        )
        subtype = determine_subtype(lec_num, practical_slots, pract_attepts, queue_len)

        if is_prof_available and can_scheduled:
            subject = get_professor_subject_by_year_and_type(profs, professors_queue[0], year, subtype=subtype)
            if subject and get_subject_workload(
                professors_queue[0], year, subject, subtype, profs
            ):
                optional_subjects = get_optional_subjects(
                    professors_queue[0], year, subject, subtype, profs
                )

                # TODO: Split this into multiple functions
                if optional_subjects:
                    if schedule_optional_subject(
                        available_prof,
                        optional_subjects,
                        professors_queue,
                        subject,
                        year,
                        days,
                        day_num,
                        subtype,
                        ttlist,
                        profs,
                    ):
                        day_num += 1
                        pract_attepts = 0

                else:
                    ttlist[year][days[day_num]].append(
                        {
                            "subject": subject,
                            "subtype": subtype,
                            "professor": professors_queue[0],
                        }
                    )
                    decrease_workload(
                        professors_queue[0], year, subject, subtype, profs
                    )
                    day_num += 1
                    pract_attepts = 0

        if count >= 100:
            while day_num < number_of_days:
                # print(f"Attempt exceeded! {year} {available} {day_num =} {lec_num = }")
                ttlist[year][days[day_num]].append(
                    {
                        "subject": "Empty Slot",
                        "subtype": "Empty Slot",
                        "professor": "Empty Slot",
                    }
                )
                day_num += 1
                pract_attepts = 0

        queue_next()
        attepts += 1
        pract_attepts += 1


def check_professor_available(
    lec_num: int, day: str, ttlist: dict, profs: dict
) -> list[str]:
    """
    Checks the availability of professors for a specific lecture number and day from timetable.

    Args:
        lec_num (int): The lecture number to check
        day (str): The day of the week to check availability for

    Returns:
        list: A list of professor names that are available for the given lecture number and day
    """

    busy_professors = []

    # finding which lecture at specified lec number
    for year in ttlist.keys():
        scheduled_lectures: list = ttlist[year][day]

        # number of scheduled lecture can't be less than lec number
        if len(scheduled_lectures) - 1 >= lec_num:
            busy_professors.append(scheduled_lectures[lec_num]["professor"])

    all_busy_professors = split_strip_strings(busy_professors)

    return [teacher for teacher in profs.keys() if teacher not in all_busy_professors]


def split_strip_strings(input_string_list: list[str]) -> list[str]:
    """
    Splits each string in the input list on "/", strips leading and trailing whitespace from each resulting word,
    and returns a list of all the words.

    Args:
        input_string_list: A list of strings to be split and stripped.

    Returns:
        A list of all the words obtained after splitting and stripping the input strings.
    """
    words = [word.strip() for string in input_string_list for word in string.split("/")]
    return words


def decrease_workload(
    professor: str,
    year: str,
    subject: str,
    subject_type: str,
    profs: dict[str, dict[str, list]],
) -> None:
    """
    Decreases the workload of a professor for a given subject and year.
    If the workload value exists and is greater than 0, it decreases the workload.

    Args:
    professor (str): The name of the professor.
    year (str): The academic year.
    subject (str): The subject name.
    subject_type (str): The subject type, e.g. "Core".

    Returns:
    None
    """

    for sub in profs[professor][year]:
        if (
            subject == sub["subject"]
            and sub["type"] == subject_type
            and "workload" in sub
        ):
            if sub["workload"] > 0:
                sub["workload"] -= 1


def get_professors_from_schedule(
    year: str, day: str, ttlist: dict[str, dict[str, list]]
) -> list[str]:
    """
    Returns a list of professors who teach on the specified day.
    Note: spliiting of professors at '/' is handled here.
    """
    today_lec: list[dict] = ttlist[year][day]
    professors = [subject["professor"] for subject in today_lec]
    professors = split_strip_strings(professors)

    return professors


def check_scheduling_conditions(
    professor: str,
    today_lecs: list,
    lec_num: int,
    queue_len: int,
    attepts: int,
    available_prof: list,
) -> tuple[bool, bool]:
    can_scheduled = (
        professor not in today_lecs or lec_num > queue_len or attepts >= queue_len
    )
    is_prof_available = professor in available_prof
    return can_scheduled, is_prof_available


def determine_subtype(
    lec_num: int, practical_slots: list, pract_attepts: int, queue_len: int
) -> str:
    # logic to schedule the lectures if practicals not available in practical slot
    if lec_num in practical_slots:
        subtype = "Theory" if pract_attepts >= queue_len else "Practical"
    else:
        subtype = "Theory"
    return subtype


def get_subject_workload(
    professor: str,
    year: str,
    subject: str,
    subject_type: str,
    profs: dict[str, dict[str, list]],
) -> bool:
    """
    Checks if a workload is available for a given professor,
    year, subject, and subject type.
    """
    for sub in profs[professor][year]:
        if (
            subject == sub["subject"]
            and sub["type"] == subject_type
            and "workload" in sub
        ):
            if sub["workload"] > 0:
                return True
            else:
                return False
    return True


def get_optional_subjects(
    professor: str,
    year: str,
    subject: str,
    subject_type: str,
    profs: dict[str, dict[str, list]],
) -> dict | None:
    for sub in profs[professor][year]:
        if (
            subject == sub["subject"]
            and sub["type"] == subject_type
            and "options" in sub
        ):
            return sub["options"]

    return None


def schedule_optional_subject(
    available_prof: list[str],
    optional_subjects: dict,
    professors_queue: list[str],
    subject: str,
    year: str,
    days: list[str],
    day_num: int,
    subtype: str,
    ttlist: dict[str, dict[str, list]],
    profs: dict[str, dict[str, list]],
) -> bool:
    if all(
        [opt_professor in available_prof for opt_professor in optional_subjects.keys()]
    ):
        temp_sub = subject
        temp_professor = professors_queue[0]

        for opt_professor, opt_subject in optional_subjects.items():
            temp_sub += f" / {opt_subject}"
            temp_professor += f" / {opt_professor}"

            # print(f"{opt_professor = }\n{available_prof = }\n{opt_professor in available_prof =}\n")

        ttlist[year][days[day_num]].append(
            {
                "subject": temp_sub,
                "subtype": subtype,
                "professor": temp_professor,
            }
        )

        decrease_workload(professors_queue[0], year, subject, subtype, profs)
        for opt_professor, opt_subject in optional_subjects.items():
            decrease_workload(opt_professor, year, opt_subject, subtype, profs)

        return True
    else:
        return False


def get_professor_subject_by_year_and_type(
    profs: dict[str, dict[str, list]], professor: str, year: str, subtype: str
) -> None | str:
    """
    Args:
    profs: profs
    professor: The name of the professor.
    year: The year of the course.
    subtype: The type of the subject.

    Returns:
        A subject that the professor teaches to given year.
    """

    subjects = profs[professor].get(year, [])

    if subjects:
        for subject in subjects:
            if subject["type"] == subtype:
                subjects.append(subjects.pop(0))
                return subject["subject"]

    return None
