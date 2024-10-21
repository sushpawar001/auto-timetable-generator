from app.db.config import (
    department_settings_collection,
    subject_collection,
    timetable_collection,
)
from app.utils.auto_schedule import (
    auto_schedule,
    auto_schedule_ga_score_func,
    auto_schedule_with_prof_queue,
    split_strip_strings,
)
from app.utils.convert_data_format import (
    convert_data_format_settings,
    convert_data_format_tt,
)
from app.utils.ga_utils import genetic_algorithm
from app.utils.ga_optimized import (
    genetic_algorithm_optimized,
)
import copy
from app.utils.simulated_annealing import simulated_annealing


def create_timetable(user_id: str):
    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0}
    )
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    formatted_tt_data = convert_data_format_tt(list(subjects))

    timetable = auto_schedule(formatted_tt_data, formatted_settings)

    return timetable


def store_timetable(user_id: str, timetable: dict):
    timetable_collection.delete_many({"user_id": user_id})
    timetable_collection.insert_one({"user_id": user_id, "timetable": timetable})


def create_timetable_ga(user_id: str):

    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0}
    )
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    subjects_list = list(subjects)

    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects_list])
    )
    professors_list = list(professors)
    formatted_tt_data = convert_data_format_tt(subjects_list)

    score_func = auto_schedule_ga_score_func(
        copy.deepcopy(formatted_tt_data), formatted_settings
    )

    best_q = genetic_algorithm(25, professors_list, 25, score_func, mutation_rate=0.01)

    timetable = auto_schedule_with_prof_queue(
        copy.deepcopy(formatted_tt_data), formatted_settings, best_q
    )
    # print(f"{timetable = }")

    return timetable


def create_timetable_ga_optimized(user_id: str):

    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0}
    )
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    subjects_list = list(subjects)

    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects_list])
    )
    professors_list = list(professors)
    formatted_tt_data = convert_data_format_tt(subjects_list)

    score_func = auto_schedule_ga_score_func(
        copy.deepcopy(formatted_tt_data), formatted_settings
    )

    best_q = genetic_algorithm_optimized(
        25, professors_list, 25, score_func, mutation_rate=0.01
    )

    timetable = auto_schedule_with_prof_queue(
        copy.deepcopy(formatted_tt_data), formatted_settings, best_q
    )

    return timetable


def create_timetable_sa(user_id: str):

    INITIAL_TEMPERATURE = 2000.0
    COOLING_RATE = 0.995
    NUM_ITERATIONS = 2000

    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0}
    )
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    subjects_list = list(subjects)

    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects_list])
    )
    professors_list = list(professors)
    formatted_tt_data = convert_data_format_tt(subjects_list)

    score_func = auto_schedule_ga_score_func(
        copy.deepcopy(formatted_tt_data), copy.deepcopy(formatted_settings)
    )

    best_q, best_score = simulated_annealing(
        score_func,
        professors_list,
        INITIAL_TEMPERATURE,
        COOLING_RATE,
        NUM_ITERATIONS,
    )
    timetable = auto_schedule_with_prof_queue(
        copy.deepcopy(formatted_tt_data), formatted_settings, best_q
    )

    return timetable


def create_timetable_ai(user_id: str, execution_time_seconds: int = 30):

    # SA constants
    INITIAL_TEMPERATURE = 2000.0
    COOLING_RATE = 0.995
    NUM_ITERATIONS = 1500

    department_settings = department_settings_collection.find(
        {"user_id": user_id}, {"_id": 0, "user_id": 0}
    )
    formatted_settings = convert_data_format_settings(list(department_settings))

    subjects = subject_collection.find({"user_id": user_id})
    subjects_list = list(subjects)

    professors = set(
        split_strip_strings([subject["professor"] for subject in subjects_list])
    )
    professors_list = list(professors)
    formatted_tt_data = convert_data_format_tt(subjects_list)

    score_func = auto_schedule_ga_score_func(
        copy.deepcopy(formatted_tt_data), copy.deepcopy(formatted_settings)
    )

    best_q_sa, best_score_sa = simulated_annealing(
        score_func,
        professors_list,
        INITIAL_TEMPERATURE,
        COOLING_RATE,
        NUM_ITERATIONS,
    )

    best_q_ga = genetic_algorithm_optimized(
        25, professors_list, 25, score_func, mutation_rate=0.01
    )

    best_q_sa2, best_score_sa2 = simulated_annealing(
        score_func,
        best_q_ga,
        INITIAL_TEMPERATURE,
        COOLING_RATE - 0.15,
        NUM_ITERATIONS,
    )

    best_score_ga = score_func(best_q_ga)

    scores = [(best_score_sa, best_q_sa), (best_score_ga, best_q_ga), (best_score_sa2, best_q_sa2)]
    
    best_score, best_q = max(scores, key=lambda x: x[0])

    timetable = auto_schedule_with_prof_queue(
        copy.deepcopy(formatted_tt_data), formatted_settings, best_q
    )

    return timetable
