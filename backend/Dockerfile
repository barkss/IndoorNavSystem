FROM maven:3.8.5-openjdk-17 AS build
# remove WORKDIR /app
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
# COPY --from=build /workspace/app/target/indoor-navigation-backend-*.jar app.jar
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
