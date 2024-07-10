from app.models.subject_model import SubjectModel


def convert_data_format(subjects: list[SubjectModel]):
    new_dict = {}  # dictionary to store new data
    for row in subjects:
        prof: str = row["professor"].strip()
        year_dept = f"{row['college_year']} {row['department']}"
        workload: str = row["workload"]
        subject_info = {"type": row["subject_type"]}
        subject_info["workload"] = workload

        if "/" in prof:
            optional_profs = prof.split("/")
            optional_subs = row["subject"].split("/")

            for prof_idx, optional_prof in enumerate(optional_profs):
                add_prof_new_dict(optional_prof, year_dept, new_dict)
                subject_info_copy = subject_info.copy()  # copy to modify dict
                subject_info_copy["subject"] = optional_subs[prof_idx]

                new_dict[optional_prof][year_dept].append(subject_info_copy)

            add_optional_prof_new_dict(
                optional_profs, optional_subs, year_dept, new_dict
            )
        else:
            add_prof_new_dict(prof, year_dept, new_dict)
            subject_info["subject"] = row["subject"]
            new_dict[prof][year_dept].append(subject_info)

    return new_dict

        # if row["Department"] not in departments:
        #     departments.append(row["Department"])
        #     print(f'{row["Department"] = } type: {type(row["Department"])}')
        #     create_department_settings(row["Department"], settings)


def add_optional_prof_new_dict(
    optional_profs: list, optional_subs: list, year_dept: str, new_dict: dict
) -> None:
    for prof_idx, optional_prof in enumerate(optional_profs):
        subs_dicts: list = new_dict[optional_prof][year_dept]

        for sub_dict in subs_dicts:
            if sub_dict["subject"] == optional_subs[prof_idx]:
                opt_dict = {
                    other_prof: other_sub
                    for (other_prof, other_sub) in zip(optional_profs, optional_subs)
                    if other_prof != optional_prof
                }
                sub_dict["options"] = opt_dict


def add_prof_new_dict(prof, year_dept, new_dict) -> None:
    """
    Adds professor to new dict.
    If year-department not available then it will be added
    """
    if prof not in new_dict:
        new_dict[prof] = {}

    if year_dept not in new_dict[prof]:
        new_dict[prof][year_dept] = []
