FROM maven:3.9.9-eclipse-temurin-21 AS builder

COPY src /app/src
COPY pom.xml /app

WORKDIR /app
COPY ./Anuncio-de-Camisetas-CRUD/CamisetaProjectBackEnd/AnuncioCamisetaProject /app
RUN mvn clean install -DskipTests

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/AnuncioCamisetaProject-0.0.1-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
