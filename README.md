# Kumparan Web Automation Test

This project contains user interface (UI) automation test scripts for the Kumparan website using **Playwright** and **TypeScript**. This project is implemented using the *Page Object Model* (POM) design pattern to separate element definitions and test logic.

## 📂 Project Structure

This project is divided into several main directories for maintainability:

*   **`object/`**: Stores all web page locators. Examples include `home.page.ts`, `header.page.ts`, `login.page.ts`, `article.page.ts`, and `notFound.page.ts`.
*   **`steps/`**: Contains classes that encapsulate user actions and assertion logic. Examples include functions like `changeToDarkMode`, `likeArticle`, and `setCredentials`.
*   **`tests/task-B/`**: Contains the manual scenario test file (`kumparan_manual.spec.ts`) that strings together steps from the POM.
*   **`tests/task-C/`**: Contains the automated test file designed and generated with the help of Playwright AI Agent (`kumparan_agent.spec.ts`).

## 🧪 Test Scenarios

Based on the `kumparan_manual.spec.ts` file, this automation covers the following 7 test cases:

1.  Ensure system rejects invalid email format on the login page.
2.  Verify user can toggle dark mode theme.
3.  Verify user can toggle light mode theme.
4.  Ensure system displays an error page (404 Not Found) for unregistered URLs.
5.  Verify user cannot like an article without logging in.
6.  Verify user cannot comment on an article without logging in.
7.  Verify user cannot create a new post without logging in (Desktop only).

## 💻 Prerequisites

Ensure you have the following software installed on your system:
*   [Node.js](https://nodejs.org/) (latest version recommended)
*   Git

## 🚀 Installation

Clone this repository to your local machine, then run the following installation commands in your terminal:

```bash
# Install Node.js dependencies
npm install

# Install required Playwright browsers
npx playwright install