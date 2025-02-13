# Poker Game Application

A full-stack poker game application built with **Next.js**, **TypeScript**, and **FastAPI**. This application allows users to play poker hands to completion, save game history, and retrieve past games via a RESTful API. The architecture is designed to ensure clean separation of concerns, scalability, and maintainability.

---

## Features Checklist (Acc. Criteria)

✅ Users can play hands to completion.  
✅ Hands are saved in the database and loaded after completion.  
✅ Hand history is shown by fetching from the backend via a RESTful API.  
✅ The RESTful API aligns with standard REST principles.  
✅ Incorporates integration and end-to-end tests for frontend functionality.  
✅ Codebase uses React, NextJS, and TypeScript.  
✅ It's a single-page application.  
✅ Game logic is implemented on the client-side and matches validation on the server-side.  
✅ There are tests for game logic.  
✅ Game logic is separated from UI logic.  

---

## Architecture

### Frontend Architecture

The frontend is built using **Next.js** and **TypeScript**, following a modular and component-based architecture. Key features include:

#### Key Directories:
- **`src/components/`**: Reusable UI components (e.g., cards, buttons, game board).  
- **`src/pages/`**: Next.js pages (e.g., home page, game page).  
- **`src/stores/`**: State management using **Zustand** for predictable state updates.  
- **`src/services/`**: API communication layer to interact with the backend.  
- **`src/interfaces/`**: TypeScript interfaces for type safety.  
- **`src/__tests__/`**: Unit tests for components and game logic.  
- **`e2e/`**: End-to-end tests using **Playwright**.  

#### State Management:
- **`gamePlayStore`**: Manages the game state, including player actions, game phases, and results.  
- **`cardStore`**: Handles deck creation, shuffling, and card distribution.  
- **`logStore`**: Manages game logs for debugging and history.  
- **`storyStore`**: Handles fetching and displaying game history from the backend.  

#### Key Features:
- **Single-Page Application (SPA)**: The application is designed as an SPA for seamless user experience.  
- **Client-Side Game Logic**: Game logic (e.g., hand evaluation, betting rounds) is implemented on the client side for responsiveness.  
- **Server-Side Validation**: The backend validates game actions to ensure consistency and prevent cheating.  

---

### Backend Architecture

The backend is built using **FastAPI** and **PostgreSQL**, following a layered architecture with clear separation of concerns.

#### Key Directories:
- **`src/api/routes.py`**: Defines RESTful API endpoints (e.g., saving games, retrieving game history).  
- **`src/models/`**: Contains data models for database interactions.  
- **`src/services/`**: Implements business logic (e.g., game validation, hand evaluation).  
- **`src/repositories/`**: Handles database operations using the repository pattern.  

#### Database Schema:
The PostgreSQL database uses a single table `game_story` with the following structure:
- **`id`**: UUID (Primary Key).  
- **`big_blind`**: Integer (the big blind amount for the game).  
- **`player_stacks`**: Integer Array (stack sizes of players at the start of the game).  
- **`hands`**: Text Array (player hands for each round).  
- **`actions`**: Text Array (actions taken by players during the game).  
- **`results`**: Integer Array (final results of the game).  

#### RESTful API Endpoints:
- **`POST /save-game/`**: Saves a completed game to the database.  
- **`GET /get-games/`**: Retrieves all saved games.  
- **`GET /get-game/{game_id}`**: Retrieves a specific game by its ID.  

---

## Getting Started

### Prerequisites
- **Docker** and **Docker Compose** for containerization.  
- **Node.js** (for local frontend development).  
- **Python 3.8+** (for local backend development).  

### Running the Application
1. Start the application using Docker Compose:
   ```bash
   sudo docker-compose up -d
   ```
2. Access the application at:
   ```bash
   http://localhost:3000
   ```

---

## Running Tests

### Frontend Tests

#### Unit Tests:
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Run unit tests using Jest:
   ```bash
   npm test
   ```

#### End-to-End (E2E) Tests:
1. Run E2E tests using Playwright:
   ```bash
   npm run test:e2e
   ```
2. For E2E tests with UI:
   ```bash
   npm run test:e2e:ui
   ```


---

## Development

### Key Architectural Decisions
1. **Separation of Concerns**: Game logic is separated from UI components for maintainability.  
2. **State Management**: Zustand is used for predictable state updates.  
3. **Type Safety**: TypeScript ensures type safety and improves developer experience.  
4. **RESTful API**: The backend API follows REST principles for consistency and scalability.  
5. **Testing**: Comprehensive test coverage using Jest, Playwright, and pytest.  

### Folder Structure
```
.
├── Backend
│   ├── Dockerfile
│   ├── poetry.lock
│   ├── __pycache__
│   ├── pyproject.toml
│   └── src
├── docker-compose.yml
├── Frontend
│   ├── components.json
│   ├── Dockerfile
│   ├── e2e
│   ├── eslint.config.mjs
│   ├── jest.config.js
│   ├── jest.setup.js
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── playwright.config.ts
│   ├── playwright-report
│   ├── postcss.config.mjs
│   ├── public
│   ├── README.md
│   ├── src
│   ├── tailwind.config.ts
│   ├── test-results
│   ├── tests
│   └── tsconfig.json
└── readme.md
```

---
