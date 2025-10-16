# ===========================
# 1️⃣ BUILD STAGE
# ===========================
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy all files and build the JAR
COPY . .
RUN mvn clean package -DskipTests

# ===========================
# 2️⃣ RUNTIME STAGE
# ===========================
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR from previous stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Set environment variables (do not hardcode secrets here)
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}

# Expose your backend port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
