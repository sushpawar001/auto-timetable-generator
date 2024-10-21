import random


def create_initial_population(population_size, professors):
    population = []
    for i in range(population_size):
        population.append(random.sample(professors, len(professors)))
    return population


def select_parents(population, fitness_function, k=3):
    return max(random.sample(population, k), key=fitness_function)


def select_parents_with_scores(population, fitness_scores, k=3):
    return max(
        random.sample(list(zip(population, fitness_scores)), k), key=lambda x: x[1]
    )[0]


def crossover(parent1, parent2):
    crossover_point = random.randint(1, len(parent1) - 1)
    child = parent1[:crossover_point] + [
        item for item in parent2 if item not in parent1[:crossover_point]
    ]
    return child


def mutate(individual, mutation_rate=0.01):
    if random.random() < mutation_rate:
        idx1, idx2 = random.sample(range(len(individual)), 2)
        individual[idx1], individual[idx2] = individual[idx2], individual[idx1]
    return individual


def genetic_algorithm(
    population_size, professors, generations, fitness_function, mutation_rate=0.01
):
    population = create_initial_population(population_size, professors)

    for generation in range(generations):
        new_population = []
        for _ in range(population_size):
            parent1 = select_parents(population, fitness_function)
            parent2 = select_parents(population, fitness_function)
            child = crossover(parent1, parent2)
            child = mutate(child, mutation_rate)
            new_population.append(child)
        population = new_population

    return max(population, key=fitness_function)