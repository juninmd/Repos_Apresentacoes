```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines outline the specific requirements and philosophies for development of AI coding agents within this repository. Adherence to these principles ensures maintainability, quality, and efficient development.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent and its components should have a single, well-defined purpose. Avoid creating multiple agents with overlapping functionality.
*   **Abstraction:** Promote abstraction over repetition.  Clearly defined interfaces and abstract classes will minimize duplication.
*   **Code Reuse:**  Identify and reuse common logic and data structures across multiple agents.  Implement basic abstractions as needed.
*   **Modular Design:** Break down complex logic into smaller, independently testable modules.

## 2. KISS (Keep It Simple, Stupid)

*   **Minimal Code:** Strive for the shortest possible code to achieve the desired functionality.  Avoid unnecessary complexity.
*   **Readability:** Prioritize code clarity and maintainability. Use meaningful variable and function names.
*   **Simplicity:** Implement features with the simplest possible design. Avoid overly convoluted logic.
*   **Early Error Handling:**  Include basic error handling where appropriate, minimizing unexpected behavior.

## 3. SOLID Principles

*   **Single Responsibility:** Each class/agent should have only one reason to change.
*   **Open/Closed Principle:**  The system should be extensible through mechanisms like APIs, without modifying the core code.
*   **Liskov Substitution Principle:**  Subclasses should be able to be substituted for their base classes without altering the correctness of the system.
*   **Interface Segregation Principle:** Clients shouldn't be forced to bound to methods they don't use.
*   **Dependency Inversion Principle:** Higher-level modules shouldn't depend on lower-level modules; they should depend on abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Future-Proofing:**  Avoid adding features or code that is likely to be needed in the future. Focus on the current requirements.
*   **Progress Over Perfection:**  Complete functionality is better than perfect implementation, especially in the initial stages.
*   **Refactoring:**  Refactor only when necessary to improve the code's structure and readability, not to add new functionality.

## 5. Code Quality & Testing

*   **Maximum 180 lines of code:** All code must be within this limit.  Lines should be checked for readability.
*   **Unit Tests:** All agent functions and modules *must* have comprehensive unit tests.  Tests should cover all critical functionality.
*   **Test Coverage:** Aim for 80% test coverage.  Use a dedicated coverage tool (e.g., `coverage.py`) for automated testing.
*   **Data Driven:** Data should be structured and presented in a way that facilitates automated testing and adaptability.  Test cases should be designed to validate the data.
*   **Clear Error Handling:**  Appropriate error messages should be provided to the user, and logging should be used to track errors.

## 6. File Structure & Conventions

*   **Consistent Formatting:**  Follow a consistent code style (e.g., using a linter like `flake8`) throughout the repository.
*   **Clear Comments:**  Provide concise and informative comments explaining complex logic and assumptions.  Comments should prioritize *why* not *what*.
*   **Modular File Names:** Use descriptive file names that reflect the file's purpose.  Avoid generic names.
*   **Docstrings:**  Include docstrings for all functions, classes, and modules, explaining their purpose, arguments, and return values.
*   **Dependency Management:**  Use a dependency management tool (e.g., `pipenv`, `poetry`) to manage dependencies.

## 7. Development Practices

*   **Version Control:**  Use a version control system (e.g., Git) and follow established branching and merging practices.
*   **Code Reviews:** Conduct regular code reviews to ensure code quality and adherence to guidelines.
*   **Documentation Updates:** Keep documentation up-to-date as the code evolves.  Document API usage.
*   **Continuous Integration:** Integrate automated testing into the CI/CD pipeline.

## 8. Specific Requirements (Example - Adapt to your project)

*   **Agent API Specification:** Define a clear API specification for each agent.
*   **Data Serialization Format:**  Choose a data serialization format (e.g., JSON, Protocol Buffers) for data exchange.
*   **State Management:** Implement a well-defined strategy for agent state management (consider a simple key-value store).

These guidelines are crucial for maintaining the quality, stability, and scalability of the AGENTS.md repository.
```