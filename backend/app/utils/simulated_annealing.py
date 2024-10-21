import random
import math
from typing import Callable


def simulated_annealing(
    score_function: Callable[[list[str]], float],
    initial_state: list[str],
    temperature: float,
    cooling_rate: float,
    num_iterations: int,
):
    current_state = initial_state
    current_score = score_function(current_state)
    best_state = current_state
    best_score = current_score

    for _ in range(num_iterations):
        # Generate a neighbor state
        neighbor = generate_neighbor(current_state)
        neighbor_score = score_function(neighbor)

        # Decide whether to accept the neighbor
        if (
            accept_probability(current_score, neighbor_score, temperature)
            > random.random()
        ):
            current_state = neighbor
            current_score = neighbor_score

        # Update the best state if necessary
        if current_score > best_score:
            best_state = current_state[:]
            best_score = current_score

        # Cool down the temperature
        temperature *= cooling_rate

    return best_state, best_score


def generate_neighbor(state: list[str]) -> list[str]:
    # Swap two random elements
    neighbor = state.copy()
    i, j = random.sample(range(len(state)), 2)
    neighbor[i], neighbor[j] = neighbor[j], neighbor[i]
    return neighbor


def accept_probability(
    current_score: float, neighbor_score: float, temperature: float
) -> float:
    if neighbor_score > current_score:
        return 1.0
    return math.exp((neighbor_score - current_score) / temperature)
