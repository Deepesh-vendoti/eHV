# Electronic Health Records Management System (eHV)

## Project Structure

The project is organized into two main directories:

```
ehv/
├── frontend/           # React frontend application (Port: 4152)
│   ├── src/           # React source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
├── backend/           # Spring Boot backend application (Port: 8080)
│   ├── src/          # Java source files
│   └── pom.xml       # Backend dependencies
│
└── package.json      # Root package.json for managing both frontend and backend
```

## Development Setup

1. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   ```

2. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   npm run start:frontend  # Frontend on port 4152
   npm run start:backend   # Backend on port 8080
   ```

3. Build for production:
   ```bash
   # Build both frontend and backend
   npm run build:frontend
   npm run build:backend
   ```

## API Documentation

- Backend API endpoints are available at `http://localhost:8080/api`
- Frontend development server runs at `http://localhost:4152`

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - React Router

- Backend:
  - Spring Boot
  - Spring Security
  - Spring Data JPA
  - PostgreSQL 