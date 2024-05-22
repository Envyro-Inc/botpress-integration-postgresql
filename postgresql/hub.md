
# PostgreSQL Integration for Botpress

Empower your Botpress chatbot with PostgreSQL to manage your database. Create, query, update, and delete database tables directly through your chatbot. Ideal for automating database workflows.

## Table of Contents
- [Introduction](#introduction)
- [PostgreSQL Setup & Configuration](#postgresql-setup--configuration)
  - [Prerequisites](#prerequisites)
  - [Enable Integration](#enable-integration)
- [Actions](#actions)
  - [Create Table](#create-table)
  - [Drop Table](#drop-table)
  - [Insert Data](#insert-data)
  - [Delete Data](#delete-data)
  - [Update Data](#update-data)
  - [Query Data](#query-data)
  - [Custom Query](#custom-query)
- [Use Cases](#use-cases)
- [Popular SQL Commands](#popular-sql-commands)
- [Supported Events](#supported-events)

## Introduction
The PostgreSQL integration for Botpress empowers your chatbot to manage your database. Create, query, update, and delete database tables directly through your chatbot. This integration is ideal for automating database workflows.

## PostgreSQL Setup & Configuration
### Prerequisites
Before enabling the Botpress PostgreSQL Integration, please ensure that you have the following:

- A Botpress server instance set up either locally or in the cloud.
- PostgreSQL database credentials with appropriate permissions.

### Enable Integration
To enable the PostgreSQL integration in Botpress, follow these steps:

1. Access your Botpress admin panel.
2. Navigate to the “Integrations” section.
3. Locate the PostgreSQL integration and click on “Enable” or “Configure.”
4. Provide the required `dbUser`, `dbHost`, `dbName`, `dbPassword`, and `dbPort`.
5. Save the configuration.

## Actions
Here are the actions supported by the PostgreSQL integration:

### Create Table
Create a new table in the PostgreSQL database.

### Drop Table
Drop an existing table from the PostgreSQL database.

### Insert Data
Insert data into a specified table.

### Delete Data
Delete data from a specified table based on conditions.

### Update Data
Update data in a specified table based on conditions.

### Query Data
Query data from a specified table based on conditions.

### Custom Query
Execute a custom SQL query on the PostgreSQL database.

## Use Cases
Here are some common use cases for the PostgreSQL integration:

1. **Database Management**
   - Enable users to create and drop tables.
   - Use the Create Table and Drop Table actions to manage database schema.

2. **Data Entry**
   - Allow users to insert data into tables.
   - Use the Insert Data action to add new records to the database.

3. **Data Retrieval**
   - Retrieve and display data from the database.
   - Use the Query Data action to fetch records based on user input.

4. **Data Modification**
   - Update and delete records in the database.
   - Use the Update Data and Delete Data actions to modify existing records.

5. **Custom Queries**
   - Execute complex SQL queries directly.
   - Use the Custom Query action for advanced database operations.

## Popular SQL Commands
To aid beginner SQL users, here are some popular SQL commands:

1. **Create Table**
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE NOT NULL
   );
   ```

2. **Insert Data**
   ```sql
   INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
   ```

3. **Select Data**
   ```sql
   SELECT * FROM users;
   ```

4. **Update Data**
   ```sql
   UPDATE users SET name = 'Jane Doe' WHERE email = 'john.doe@example.com';
   ```

5. **Delete Data**
   ```sql
   DELETE FROM users WHERE email = 'john.doe@example.com';
   ```

6. **Drop Table**
   ```sql
   DROP TABLE users;
   ```

## Supported Events
This integration does not currently include events that trigger based on PostgreSQL activities. However, you can customize the integration to listen for specific database event notifications via triggers or other mechanisms in PostgreSQL.
