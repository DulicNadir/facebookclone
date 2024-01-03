
# Facebook clone
This is my final project and is a clone of a famous social network Facebook.
The idea of the project is to showcase some of the abilities learnt throughout the course.
I am using Node.js for the backend, React.js for frontent and MongoDB database.


## Technologies description

### Node.js

Node.js is a server-side JavaScript runtime environment that allows developers to build scalable and efficient network applications. It is commonly used for:

-   **Web Servers:** Node.js is often used to create web servers that can handle a large number of simultaneous connections with high performance, making it suitable for building real-time applications.
    
-   **API Development:** Node.js is excellent for building RESTful APIs, providing a robust foundation for creating backend services that can serve data to web and mobile applications.
    
-   **Microservices:** It's widely adopted in microservices architecture, enabling the development of small, independent services that can work together seamlessly.
    

**Advantages:**

-   **Fast Execution:** Node.js is built on the V8 JavaScript engine, making it incredibly fast and efficient, which is crucial for handling real-time applications.
    
-   **Non-blocking I/O:** Node.js uses an event-driven, non-blocking I/O model, allowing it to handle a large number of connections simultaneously without blocking the execution thread.
    
-   **Large Ecosystem:** Node.js has a rich ecosystem of libraries and packages available through npm (Node Package Manager), making it easy to extend functionality.
    
-   **JavaScript Everywhere:** Developers can use JavaScript both on the client and server sides, streamlining development and reducing context switching.
    

### React.js

React.js, developed by Facebook, is a popular JavaScript library for building user interfaces. It's commonly used for:

-   **Single Page Applications (SPAs):** React is ideal for building SPAs, where the user interacts with a single web page, and content is dynamically updated without full page reloads.
    
-   **Component-Based UI:** React encourages the creation of reusable UI components, simplifying development, maintenance, and testing.
    
-   **Mobile App Development:** With tools like React Native, you can use React to build mobile applications for iOS and Android platforms.
    

**Advantages:**

-   **Declarative:** React uses a declarative approach to building UIs, making it easier to understand and debug code.
    
-   **Virtual DOM:** React's virtual DOM optimizes rendering performance, ensuring that only necessary updates are applied to the actual DOM, improving application speed.
    
-   **Community and Ecosystem:** React has a large and active community, resulting in a wealth of third-party libraries, tools, and resources.
    
-   **SEO-Friendly:** React can be used on the server side (with technologies like Next.js) to render pages on the server, making them more search engine-friendly.
    

### MongoDB

MongoDB is a NoSQL database management system that is designed for flexibility and scalability. It's commonly used for:

-   **Document Storage:** MongoDB stores data in flexible, JSON-like documents, making it suitable for a wide range of data types and structures.
    
-   **Scalable Applications:** MongoDB's horizontal scaling capabilities allow it to handle large volumes of data and high-throughput workloads.
    
-   **Real-Time Applications:** It's often used in conjunction with Node.js and other technologies to build real-time, data-driven applications.
    

**Advantages:**

-   **Flexible Schema:** MongoDB's schema-less design allows you to adapt your data model as your application evolves.
    
-   **Horizontal Scalability:** You can scale MongoDB horizontally by adding more servers, ensuring high availability and performance.
    
-   **Rich Query Language:** MongoDB offers a powerful query language for searching and manipulating data.
    
-   **Community and Support:** MongoDB has a strong community and official support, along with a wide range of drivers for various programming languages.

## Project description

In this application users will be able to register, activate their account and log in, just as they would in  the real Facebook. 
For authentification I am using JWT and Google OAuth2.0 to send e-mails, as well as React Redux.
For storing images I am using Cloudinary.
Routes are protected both on the frontend and on the backend. On frontend, user must be logged in to see the pages, or else he is directed to the log in page.
On backend, I have implemented a middleware that takes the user's token and verifies it with jwt.verify function.

The user interface is responsive and I have used media queries for this.
The user interface is not the same on certain pages, depending on who we logged in as, are we a visitor or not.

For global state handling, I mentioned that I am using React Redux. There is a reducers folder and there are all of the reducers used in the project.

# Main parts of the application
The application itself is split into two folders, backend and frontend and a database.

## Database 

For the database I chose a no sql database - MongoDB. 
I created several collections using the Models folder and files inside it.
These models are: 

 - Code
 - Post
 - React
 - User

## Backend
The backend folder is where the Node.js server runs,  and there is a ***server.js*** file, which runs the server. There, we connect to the database and have our routes.
There is a controllers folder which has ***user.js,  post.js , upload.js, react.js*** inside.
Inside ***user.js***, there is all the logic for various operations like register, login, activate account, sending reset codes, changing password etc.
Inside ***react.js***, there are functions for reacting to a post.
Inside ***post.js*** there are functions for creating, getting and deleting posts.
Inside ***upload.js*** there are functions for uploading and listing images.
Inside ***helpers*** folder, there are files that have helper functions that are used inside the app, like validations, token generation, functions to send mail for code and verification, and generation of that same code.
I also added middleware for authenticating a user, which is used whenever needed. 
There is a ***models*** folder, inside it are models for the database as I am using ***mongoose*** to help me with the database. 
Finally, there is a routes folder which has all the routes used in the application.

### Writing of the functions

All of the functions are written in controllers and helpers folder.
The functions are using async and await, which makes it wait for the result of the function.
Every function uses try catch blocks for easier error handling and they return error messages.
The functions are well written and most of them are made so that CRUD operations are available to the user, or at least CRD.

Besides the usual functions, I added verification of the account as well as resetting the user's password. These functions are implemented with the help of ***nodemailer*** and Google 
***OAuth2***. 
### Mongoose
Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.
It made my job of writing queries much easier and faster. The responses are much easier to read and the code is easier to modify.

### Routes
In the routes folder, all of the routes are specified. 
Routes are specific to their file, and every file is for a seperate functionality. 

## Frontend
Frontend folder is where the looks of the application and static data are created and stored.
There are the main ***App.js*** and ***index.js*** files, where we can see the structure of the frontend side.
I am using *react-router-dom* to navigate between pages, and I have routes that are protected and can only be seen when logged in. 
That is easily done by creating a helper ***LoggedIn*** and ***NotLoggedIn*** components to handle such cases.	
The whole frontend folder is divided into folders, main ones are ***components*** and ***pages***.
#### Components folder
Inside the components folder are all the components made for the application.  They are split up into folders and used through the app.
Most of the components are ***index.jsx*** files and I am applying styles from ***styles.css*** files.
#### Pages folder
Pages folder has all the pages the application has and that the user can see. 
The pages folder itself is divided into seperate folders for pages and they use the components made inside the ***components folder***.

Beside those two folders, there are additional folders that help organize the code, such as ***reducers folder*** (inside are the reducers used to manage state with React Redux),
***svg, styles, data folders*** for icons, images and static text that is found on the Facebook page and a ***helpers folder*** for helper functions.

## Overview of the pages folder
As the pages folder is important and showcases the pages that user can see, this section will briefly explain what each folder(page) contains.


### login
Login page is the first page the user will see when starting the app. It looks just like the Facebook login, and the user can either log in or register using the forms inside.
Upon finishing registration, user will recieve a e-mail where he can activate his account. 
### home
Home page is the main part of the application. It has the main part of the page with all the posts and stories, as well as side menu's. Some of these are interactive, and some of them I made just to look like Facebook.
 The home page folder has an activation page as well, which looks just like the home page, but has a popup that is shown after activating the account.
### reset
This is a page used for resetting the password. User will get a code delivered on their email, which they will then type into an input field.
The code generated is saved in the database, and we check if the inputed code is the same as the one in the database.

The user goes through phases: enters email, gets the code, types in the code and changes the password.

### profile
Profile page is one of the more complicated pages in this project. 
User can see both his and other people's profiles, as well as change profile images, cover images, add posts and see his pictures.
The profile page is different and has different functionality depending on if the logged in user is looking at his own profile or not.

### aboutme
This is a simple static page that has i18n functionality and bosnian and english language.

## Overview of the components folder

Components folder has all the components used in the application. The goal was to create as many components that can be used multiple times. Such components are the Post, CreatePost, EmojiPicker components.
As a lot of these components are simple components with css added to them, but some of them have logic implemented inside them.

For form handling, I am using ***Formik***, it has already built in Inputs and I can validate forms easier.

**CreatePostComponent** is one of the most complicated components and it has to be mentioned.
The component handles opening the popup for creating a post, and submitting that post to backend.
It allows us to submit text, picture, or both together. 
When an user creates a post, it pops up in realtime on either the home page or profile page.
The post can be deleted if we are the authors.

## Translations
Translations are not implemented in the whole application, but only in the aboutme page.
The package I am using for translations is i18n, it allows me to create json files and have as many languages as I want. These languages can be changed on a button click. In the about page I implemented english and bosnian.

## Route switching

Routes are switched with the ***react-router-dom*** package, and there are custom made LoggedIn and NotLoggedIn routes, that I am using to protect the routes on the frontend.

## Helpers folder

Helpers folder is used for helper functions such as hiding components when clicking away from them, uploading images, converting types and such. These functions are mostly calling functions from backend and hitting thir respective routes.

## Dockerfiles and .env files

There are some constants that are best to be stored inside an .env file, hidden from git and from the plain code. Some of those are credentials, passwords or url's. 
Dockerfiles are used for Dockerizing an application, making it work on a virtual container. The docker files contain a set of instructions for Docker to execute when we are running the project.

In the root folder there is docker-compose.yml, which is used to combine both of the docker files and make the application work.






# facebookclone
# facebookclone
