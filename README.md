
# Setup Guide — 2048 Game

## Prerequisites
1. Docker installed on your machine.   
2. Node.js and npm installed for the frontend setup.   
3. An Aiven (or any other) MySQL database instance.

## Backend Setup (with Docker)
The backend is a Spring Boot application that runs inside a Docker container.

1. Create Your Environment Configuration File
Before building the Docker image, you need to create a file named .env in the root of the `/backend` project directory. This file will store your secret credentials and database connection details.

Create the .env file and add the following variables. Replace the placeholder values with your own credentials.
```
# Your Aiven (or other) database password
SPRING_DATASOURCE_PASSWORD=YOUR_DATABASE_PASSWORD_HERE

# A long, secure, randomly generated secret for signing JWT tokens
JWT_SECRET=YOUR_UNIQUE_AND_SECRET_JWT_KEY_HERE
```

2. Update Application Properties
Make sure your `backend/src/main/resources/application.properties` file is configured to use your database connection string and username.\
Update `spring.datasource.url` and `spring.datasource.username`
with your own Aiven MySQL connection details.
```
spring.application.name=backend
spring.datasource.url=jdbc:mysql://mysql-<your-aiven-id>.aivencloud.com:<port>/defaultdb?ssl-mode=REQUIRED
spring.datasource.username=<your-aiven-username>
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
jwt.expiration=172800000
jwt.secret=${JWT_SECRET}
```

3. Build the Docker Image
```
cd backend
docker build -t game2048-backend .
```

4. Run the Backend Container
```
docker run -p 8080:8080 --env-file .env game2048-backend
```

Your backend will now be running at: `http://localhost:8080`



## Frontend Setup

1. Install Dependencies
```
cd frontend
npm install
```

2. Configure .env File
```
For local development:
VITE_API_BASE_URL=http://localhost:8080
```

3. Run the Frontend
```
npm run dev
```