# ShareMingle-A-Social-Network-API


## Description 

ShareMingle-A-Social-Network-API was built to facilitate the social interactions between users and thoughts. It is built using Node.js with Express for the server framework, and MongoDB with Mongoose as the Object Data Modeling (ODM) library to manage relationships between data and provide schema validation. The API allows users to create, read, update and delete both users and thoughts, as well as adding and removing friends to a user's friend list and reactions to a thought. 

## User Story

AS A social media startup <br>
I WANT an API for my social network that uses a NoSQL database <br>
SO THAT my website can handle large amounts of unstructured data <br>

## Acceptance Criteria

GIVEN a social network API <br>
WHEN I enter the command to invoke the application <br>
THEN my server is started and the Mongoose models are synced to the MongoDB database <br>
WHEN I open API GET routes in Insomnia for users and thoughts <br>
THEN the data for each of these routes is displayed in a formatted JSON <br>
WHEN I test API POST, PUT, and DELETE routes in Insomnia <br>
THEN I am able to successfully create, update, and delete users and thoughts in my database <br>
WHEN I test API POST and DELETE routes in Insomnia <br>
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list <br>


## Walkthrough Video



https://github.com/bragceo/ShareMingle-A-Social-Network-API/assets/119948453/89859130-3c8f-4373-b853-53de1e8c7424




## Github Repository

https://github.com/bragceo/ShareMingle-A-Social-Network-API


## How the Code Works: Overview of Code Structure and its Components:

1. Server Setup:

The server is the main point of entry and is is set up in the server.js file using Express. Here, Express is imported and a new Express application is created.

Dotenv is imported to load environment variables from a .env file into process.env. This helps in keeping sensitive data, such as database connection strings, secure.

Next, the routes for users and thoughts are imported from their respective files. After this, the database is connected using the connectDB function imported from config/db.js. The Express middleware to parse JSON is also set up here.

2. Database Connection:

In the config/db.js file, the database connection is set up using Mongoose. The connectDB function is an asynchronous function that tries to connect to the MongoDB database using the connection string stored in process.env.MONGO_URI.

3. Route Setup:

The application routes are set up in the server.js file. Each route is prefixed with '/api/users' or '/api/thoughts' respectively.

4. Schema Definition:

The User and Thought schemas are defined in the models folder.

In User.js, the UserSchema is defined with properties for the username, email, thoughts, and friends. A virtual property called 'friendCount' is also defined which returns the length of the user's friends array.

In Thoughts.js, the ThoughtSchema and ReactionSchema are defined. The ThoughtSchema includes properties for the thoughtText, createdAt time, username, and reactions. A virtual property 'reactionCount' returns the length of the reactions array.
 

## How to run the application
 
Ensure that Node.js and MongoDB are installed in your system.
Install dependencies by running npm install in the root directory of the project.
Create a .env file in the root directory and provide your MongoDB connection string as MONGO_URI. Also, specify a port number for the application to run on with PORT.
Start the application by running npm start or node server.js in the terminal.
The application should now be running at http://localhost:{PORT}.

## Testing API Endpoints with Insomnia Core:

Install and open Insomnia Core.
Create a new request by clicking the plus icon (+) next to the workspace dropdown and select 'New Request'.
Give the request a name, select the request type (GET, POST, PUT, DELETE), and enter the request URL (http://localhost:{PORT}/api/{users|thoughts}).
If the request requires a body (like for POST and PUT requests), select the 'Body' tab, choose 'JSON', and enter the required JSON.
Click 'Send' to make the request and the response will be displayed in the right-hand panel.


## Special Thanks 

Shout out to the awesome Instructors and TAs who worked with me through numerous challenges. These individuals include: Diego, Enrique Gomes, and Erik Hoverstein. 




## Credits 

N/a

## License 

Please refer to license in repo 
