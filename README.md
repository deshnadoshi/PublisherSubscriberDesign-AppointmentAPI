# ECE452: Software Engineering Assignment 7
#### Deshna Doshi, dd1035
### Algorithm Design Notes: 

**_JASMINE TEST CASES NOTE: Running 'npm test' more than once in a row (without resetting or clearing the database) will cause the Jasmine test cases to FAIL. The reason being, on the first iteration of the test cases, the valid scheduling test case (Test Case 1), will be added to the database. If you run 'npm test' again, it will recognize that the contents of Test Case 1 already exist in the database, and will throw a duplication error. Therefore, that test case will fail, despite it being correct and functional, due to the structure of a database and because we don't have the possibility of resetting the database on every iteration of running the Jasmine test cases._**

1. Please run the following before running the code, to ensure that it functions as expected: npm install mysql2 http fs url console crypto. To run the tests, you will need the supertest module. 

2. The body of all the HTTP requests sent through Postman or cURL must be of type application/json. JSON messages must be formatted correctly in terms of structure (the program will occasionally handle missing data), i.e. the program will require a correctly formatted JSON in the body of the requests to function. The data in the body may be invalid/incorrect.  

3. Use GET requests for lookup and N-dates. Use DELETE requests for cancellation. Use POST requests for scheduling.

4. You will need to create a database named 'swe2024assignments'. The queries to create/set-up the database and table needed for this program are in 'appointments.sql' and 'cancellations.sql'. If you are using MAMP, you can import these tables into the database you created. 

5. Please look through the createPool function in 'pubsubscheduler.js' and 'terminalbonder.js' and change any necessary variables (such as user, password, or host) to match those in your system, before testing this program. 

6. When an appointment is cancelled, dtstart is set to null and the status is set to CANCELLED. This is due to requirement that dtstart must be unique. 

7. The notifications will be displayed on the terminal, for the Doctor and Secretary. The audit log, will be shown via an update of the cancellations.sql database to include the information about the cancelled appointments. The appointments.sql database, will hold information about any and all scheduled appointments. It will not delete any information of cancelled appointments, simply update the status to 'Canceled'.

8. Please ensure that the pre-loaded content in the database exists before running any of the tests, otherwise you will run into unnecessary errors. 

