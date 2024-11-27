# Brighte Eats

A web application to register and view leads.

---

## Requirements

- **Database**: MySQL v5.7  
- **Node.js**: v20.18.0 and above  
- **npm**: v10.8.2  

---

## Installation

### 1. Clone the Repository  
```
git clone <repository-url>
```

### 2. Set Up Environment Variables  
Create `.env` files in both the `/backend` and `/frontend` directories based on the provided `.env.sample` files.  

### 3. Install the backend
Run the following command to set up the backend. This is required before running the frontend to avoid errors in frontend's codegen.
```
cd backend && npm install
```

### 4. Initialize the Database  
Still in the backend directory, run the following command to set up the database:  
```
npm run init-db
```

### 5. Run the backend  
Run the following command to set up the database:  
```
npm run dev
```

### 6. Install and run frontend
In a new terminal, run the following command to set up and run the frontend
```
cd frontend && npm install && npm run dev
```
### 7. Accessing the application

#### 7.1 [backend](http://localhost:4000)

#### 7.2 [frontend](http://localhost:3000)

---

## Development Notes

During development, if you make any changes to the GraphQL schema, ensure to:

1. **Update the schema**: Regenerate any necessary client-side types or queries. Execute the following in the backend and frontend directories:
```
npm run generate
```
2. **Succeeding runs**: You can stay in the root project and just execute to concurrently run the backend and frontend applications
```
npm run start
```

## Special thanks to:

1. **Apollo Server**: - for GraphQL API and UI - 
2. **Apollo Server Testing**: - https://github.com/rukykf/jest-sqlite-tutorial
3. **Apollo SQL Data Source**: - https://github.com/nic-jennings/batched-sql-datasource using Knex