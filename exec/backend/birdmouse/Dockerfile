FROM openjdk:11-jdk-slim

VOLUME [ "/tmp" ]

WORKDIR /back

COPY build/libs/*.jar /back/application.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/back/application.jar"]
