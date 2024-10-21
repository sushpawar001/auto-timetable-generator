import random
from typing import List, Callable, Tuple


def create_initial_population(
    population_size: int, professors: List[str]
) -> List[List[str]]:
    return [random.sample(professors, len(professors)) for _ in range(population_size)]


def select_parents(
    population: List[List[str]], fitness_scores: List[float], k: int = 3
) -> List[str]:
    selected_indices = random.sample(range(len(population)), k)
    selected_parents = [population[i] for i in selected_indices]
    selected_scores = [fitness_scores[i] for i in selected_indices]
    return max(zip(selected_parents, selected_scores), key=lambda x: x[1])[0]


def crossover(parent1: List[str], parent2: List[str]) -> List[str]:
    crossover_point = random.randint(1, len(parent1) - 1)
    child = parent1[:crossover_point] + [
        item for item in parent2 if item not in parent1[:crossover_point]
    ]
    return child


def mutate(individual: List[str], mutation_rate: float = 0.01) -> List[str]:
    if random.random() < mutation_rate:
        idx1, idx2 = random.sample(range(len(individual)), 2)
        individual[idx1], individual[idx2] = individual[idx2], individual[idx1]
    return individual


def genetic_algorithm_optimized(
    population_size: int,
    professors: List[str],
    generations: int,
    fitness_function: Callable[[List[str]], float],
    mutation_rate: float = 0.01,
) -> List[str]:
    population = create_initial_population(population_size, professors)

    for _ in range(generations):
        fitness_scores = [fitness_function(ind) for ind in population]
        new_population = []

        for _ in range(population_size):
            parent1 = select_parents(population, fitness_scores)
            parent2 = select_parents(population, fitness_scores)
            child = crossover(parent1, parent2)
            child = mutate(child, mutation_rate)
            new_population.append(child)

        population = new_population

    return max(population, key=fitness_function)
