```markdown
# AGENTS.md File Guidelines

These guidelines outline the standards for development for AGENTS.md, a repository for AI coding agents. Adherence to these principles is crucial for maintaining a clean, maintainable, and scalable codebase.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent should have a single, well-defined purpose. Avoid creating multiple agents with overlapping functionalities.
*   **Code Reuse:** Strive to reuse existing components and libraries whenever possible.  Refactor and adapt existing code to create new agents.
*   **Standardized Modules:** Define standard modules for common functionalities (e.g., data processing, communication, state management) and promote their consistent use.
*   **Abstraction:**  Design abstractions for complex logic to reduce redundancy.

## 2. KISS (Keep It Simple, Stupid)

*   **Minimal Code:** Each agent should have a minimal implementation that satisfies its core requirements. Avoid unnecessary complexity.
*   **Readability:** Prioritize code clarity and readability. Use meaningful variable and function names.
*   **Simplicity:**  Simplify algorithms and data structures.  Avoid over-engineering.

## 3. SOLID Principles

*   **Single Responsibility:**  As mentioned above, each component should be responsible for one thing well.
*   **Open/Closed Principle:**  Agents should be easily extensible without modifying their existing code.  New functionality should be added through new agents or modifications.
*   **Liskov Substitution Principle:**  Subclasses should be able to replace their base class without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients should not be forced to participate in abstraction that they do not require.
*   **Dependency Inversion Principle:**  High-level modules (agents) should not depend on low-level modules.  They should depend on abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Avoid Unnecessary Features:**  Do not implement features that are not currently required.  Refactor existing code to remove unused components.
*   **Focus on Requirements:**  Implement only the functionality explicitly specified in the design specifications.

## 5. Development Workflow & Code Quality

*   **Code Reviews:** All code must undergo mandatory code reviews by at least two developers.
*   **Unit Testing:** All agents must have comprehensive unit tests covering all core functionalities.
*   **Integration Testing:**  Thorough integration tests are required to ensure agents work seamlessly together.
*   **Testing Coverage:** Target a minimum of 80% test coverage.  Automated tests are crucial.
*   **Code Formatting:**  Adhere to a consistent code formatting style (e.g., using a linter like `flake8`).
*   **Documentation:**  Include clear and concise documentation for all agents, functions, and modules.
*   **Version Control:** Utilize a version control system (e.g., Git) and follow best practices for branching and merging.
*   **Error Handling:**  Implement robust error handling and logging.
*   **Data Structures & Algorithms:** Use appropriate data structures and algorithms for performance and maintainability.

## 6. File Size Constraints

*   **Maximum Code Length:** Each file must be no more than 180 lines of code.
*   **File Structure:** Follow a consistent file structure (see example below).

```
AGENTS.md
    README.md
    agent1.py
    agent2.py
    ...
```

**File Structure Example:**

*   `README.md`:  Introduction, API documentation, and usage instructions.
*   `agent1.py`: Contains the primary logic for agent 1.
*   `agent2.py`: Contains the primary logic for agent 2.
*   ...

## 7.  Testing Requirements

*   All agents must have unit tests defined.
*   Tests should cover all critical functionality.
*   Test cases should be well-documented.

## 8.  Tools & Technologies

*   Use a suitable programming language and framework.
*   Employ a code editor with linting and formatting support.
*   Utilize a testing framework (e.g., `unittest` or `pytest`).

## 9.  Continuous Integration/Continuous Deployment (CI/CD)

*   Implement a CI/CD pipeline to automatically build, test, and deploy agents.

## 10.  Maintenance & Evolution

*   Maintain a clear versioning strategy.
*   Document significant changes and rationale.
*   Regularly review and update the code to ensure it remains maintainable and efficient.
```