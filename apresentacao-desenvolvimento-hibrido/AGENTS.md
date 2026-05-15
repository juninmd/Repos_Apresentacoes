```markdown
# AGENTS.md Guidelines

## 1. DRY (Don't Repeat Yourself)

*   All code within this repository must be self-contained and reusable.
*   Avoid duplicating functionality or logic.
*   When a component needs to be reused, it should be encapsulated into a separate, well-defined module or class.
*   Refactor existing code to eliminate redundancies.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize code clarity and readability.
*   Minimize complexity where possible.
*   Employ simple, understandable design patterns.
*   Avoid overly clever or obscure solutions.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class or module should have a single, well-defined responsibility.
*   **Open/Closed Principle:** The system should be extensible without modifying its core implementation. This is achieved through interfaces or abstraction layers.
*   **Liskov Substitution Principle:**  Subclasses should be able to be substituted for their base class without altering the correctness of the program.
*   **Interface Segregation Principle:** Clients should not be forced to use abstractions they do not need.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules.  They should depend on abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   Implement only the necessary functionalities for the current stage of development.
*   Avoid adding features or functionality that is not currently required.
*   Focus on delivering working, tested code.

## 5. Development Workflow

*   **Planning:** Before starting any code, clearly define the problem being addressed and the goals of the agent.
*   **Unit Testing:**  Each module/class must be thoroughly unit tested.
*   **Code Review:**  All code should undergo peer review to ensure quality and adherence to standards.
*   **Integration Testing:**  After unit testing, perform integration testing to verify interactions between modules.
*   **Regression Testing:**  After any changes, run regression tests to ensure existing functionality remains intact.
*   **Static Analysis:** Use static analysis tools (e.g., pylint, eslint) to identify potential issues.
*   **Continuous Integration (CI):**  Implement a CI pipeline to automatically run tests and build.
*   **Version Control:** Utilize Git for version control and adhere to branching strategies.

## 6. Code Structure & File Organization

*   **Modular Design:**  Break down the AGENTS.md repository into logical modules or components.
*   **Clear Comments:**  Add concise and informative comments to explain complex logic.
*   **Documentation:** Include brief documentation within each file explaining its purpose.
*   **Naming Conventions:** Follow consistent naming conventions for modules, classes, and variables.
*   **Error Handling:** Implement appropriate error handling and logging.

## 7. Test Coverage Requirements

*   **Minimum:** 80% of code must be covered by tests.
*   **Percentage:** Aim for 80% across all modules/classes.
*   **Types of Tests:** Include unit tests, integration tests, and potentially end-to-end tests (if applicable).

## 8. Code Length Constraint

*   Each file should not exceed 180 lines of code.  If a file is longer, it should be split into multiple files.

## 9.  Specific Guidelines for Agents

*   All agent-related code must adhere to defined agent behavior models and data structures.
*   Documentation of agent roles, responsibilities, and data requirements should be included.
*   Consider incorporating a robust logging system for debugging and monitoring.

## 10.  Further Considerations

*   Use a consistent testing framework (e.g., pytest, unittest).
*   Document API endpoints and data formats consistently.
*   Implement monitoring and alerting capabilities for the agents.
*   Design for scalability and maintainability.
```