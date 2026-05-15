```markdown
# AGENTS.md File Guidelines

These guidelines are designed to ensure consistent, maintainable, and high-quality code within the AGENTS repository. Adherence to these principles is crucial for the long-term stability and usability of the project.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent module should have a single, clearly defined responsibility.  Avoid creating multiple, loosely coupled modules for similar tasks.
*   **Code Reuse:** Identify and reuse existing code wherever possible. Favor common patterns and solutions.
*   **Abstraction:**  Use abstraction to minimize code duplication.  Define interfaces and abstract classes to decouple components.

## 2. KISS (Keep It Simple, Stupid)

*   **Simple Logic:** Prioritize readability and clarity over complex or convoluted logic.
*   **Minimal Dependencies:**  Keep dependencies to a minimum and well-documented.
*   **Easy to Understand:**  Write code that is easy to understand, even by yourself after a reasonable amount of time.
*   **Avoid Over-Engineering:**  Don’t introduce unnecessary complexity.

## 3. SOLID Principles

*   **Single Responsibility:**  Each class and module should have one primary purpose.
*   **Open/Closed Principle:**  The system should be extensible without modifying the existing code.  New features should be added through new classes, not modifications to existing ones.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients shouldn’t be forced to cater to methods they don't use.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules.  They should depend on abstractions.

## 4. YAGNI (You Aren’t Gonna Need It)

*   **Avoid Unnecessary Code:**  Don't implement features or functionalities that are not currently required.
*   **Future-Proofing:** Design code with potential future expansion in mind.  Consider edge cases and potential modifications.
*   **Focused Development:**  Concentrate on the core requirements; don't add features that are unlikely to be used in the future.

## 5. Code Length & Structure

*   **Maximum Code Length:**  Each file should not exceed 180 lines of code.
*   **Block Structure:** Use blocks (paragraphs) to delineate logical sections and improve readability.
*   **Comments:**  Provide clear and concise comments explaining complex logic, non-obvious code, or the intent behind sections.  Don't over-comment, but comment *why* not *what*.
*   **Naming Conventions:** Follow consistent naming conventions (e.g., camelCase for variables and functions).
*   **Error Handling:** Implement basic error handling (e.g., try-except blocks) where appropriate.  Avoid unhandled exceptions.

## 6. Test Coverage & Production-Ready Code

*   **Test Driven Development:** All development must be driven by tests.
*   **Unit Tests:**  Prioritize writing unit tests for each agent module.  Aim for at least 80% test coverage.
*   **Integration Tests:**  Develop integration tests to verify interactions between agents and other components.
*   **Automated Testing:** Automate tests as much as possible to ensure code quality and stability.  Mock dependencies are acceptable *only* for tests.
*   **Code Reviews:**  All code should undergo rigorous code reviews.

## 7. File Structure & Organization

*   **Clear Module Hierarchy:** Organize modules logically.  Consider a hierarchical structure reflecting the agent's functionality.
*   **Documentation:** Provide clear documentation within each module (e.g., docstrings, comments).
*   **Version Control:** Use Git for version control.  Commit frequently with meaningful commit messages.

## 8.  Specific Considerations for AGENTS.md

*   **Configuration Management:** Consider how configuration will be handled. This isn't a core requirement, but a general best practice.
*   **Data Models:** If applicable, define and document data models.
*   **API Definition:** If the AGENTS library exposes APIs, provide clear API documentation.  (This is not strictly required, but recommended).

## 9.  Production-Ready Practices

*   **Error Logging:** Implement basic error logging to help with debugging and monitoring.
*   **Logging Levels:** Use appropriate logging levels (e.g., DEBUG, INFO, WARNING, ERROR) for production.
*   **Deployment:**  Follow a standard deployment process.

These guidelines are intended to serve as a framework for developing high-quality code within the AGENTS repository.  Regular review and updates are necessary to maintain the integrity of the project.  Any deviation from these guidelines must be justified and documented.
```