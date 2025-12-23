# Synchronisation der Rollenzuordnung


## Beschreibung

Die Server der TUHH werden intern als Säule bezeichnet. In der TUHH gibt es Säulen für das 
Intranet, externen- und internen Zugriff, Ersatz-Server und Test-Server. Jede Säule hat eine 
bestimmte Aufgabe. Die Konfigurationen und Software von diesen Säulen werden bei 
Aktualisierungen dann auf die anderen Säulen übertragen. Mitarbeitern der TUHH ist 
aufgefallen, dass sich die Rollen von den Einträgen in der Produktivsäule und der 
Entwicklungssäule unterscheiden. Mit der Aktualisierung der Datenbank auf der 
Entwicklungssäule würden diese Rollen zwangsläufig auf der Produktivsäule verloren gehen. 

Mit der Anwendung sollen Administratoren es schnell und einfach haben, Rollen manuell 
nachzutragen. Hierzu soll die Programmoberfläche die Möglichkeit bieten, aus einer Liste aller 
Rollen und Säulen in einem Formular die benötigten auszuwählen und per Klick diese zu 
übernehmen. Das fertige Formular soll abschließend gespeichert und abgesendet werden, um 
die Rollen und Säulen eines Mitarbeiters zu aktualisieren.


## Technologien

- Java 19

- Spring Boot

- PostgreSQL


## Features

- Rollenverwaltung
- RESTful API
- Annotations


## Installation / Start

- Spring Initializer


## Was ich gelernt habe

- REST-API Design

- Datenbankmodellierung

- Das Spring-Framework

- Maven 


## Screenshots (optional)
