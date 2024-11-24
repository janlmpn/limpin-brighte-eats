# Brighte Eats

A web application to register and view leads.

---

## Requirements

- **Database**: MySQL  
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

### 3. Install front and backend applications
Run the following command to set up applications:  
```
npm install
```

### 4. Initialize the Database  
Run the following command to set up the database:  
```
npm run init-db
```

### 5. Start the Application  
Start both the frontend and backend services by running:  
```
npm run start
```

### 6. Accessing the application  

#### 6.1 [backend](http://localhost:4000)

#### 6.2 [frontend](http://localhost:3000)

---

## Development Notes

During development, if you make any changes to the GraphQL schema, ensure to:

1. **Update the schema**: Regenerate any necessary client-side types or queries. Execute the following in the backend and frontend directories:
```
npm run generate
```
2. **Test thoroughly**: Verify that all schema changes are reflected in both the frontend and backend.
