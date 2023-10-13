# LightBnB

## Project Structure

# LightBnb

LightBnb`  is a web application that allows users to search for and list properties for short-term rentals. It is built using Node.js, Express.js, and PostgreSQL on the backend, and HTML, CSS, and JavaScript on the frontend.
Features

    User Authentication: Users can sign up, log in, and log out of their accounts. Logged-in users can also view and manage their own property listings.
    Property Search: Users can search for properties based on location, price, and rating.
    Property Listing: Logged-in users can create new property listings, providing details such as title, description, photos, price, location, and amenities.
    Booking Reservations: Users can book reservations for available properties.
    Review System: Logged-in users can leave reviews and ratings for properties they have stayed at.

## Setup

    Clone the repository to your local machine.
    Install the project dependencies using npm install.
    Set up the PostgreSQL database with the provided SQL files in the database directory.
    Configure the database connection in the pool.js file to match your PostgreSQL setup.
    Run the development server using npm start.

## How to Use

    Open your web browser and navigate to http://localhost:3000.
    If you are a new user, sign up for an account. If you already have an account, log in.
    On the home page, you can browse available properties. Use the search form to filter properties by location, price, and rating.
    To list a new property, click on the "Create Listing" link, and fill in the required details.
    To book a property, click on the property card and select the dates you want to book.
    After your stay, you can leave a review and rating for the property.

## Project Structure

    public: Contains static files like CSS, images, and client-side JavaScript.
    views: Contains the EJS templates for rendering HTML pages.
    routes: Contains the Express.js route handlers for different endpoints.
    database: Contains SQL files for setting up the database schema and sample data.
    server.js: The main entry point of the application.

## Dependencies

    Node.js
    Express.js
    PostgreSQL
    EJS (Embedded JavaScript) for templating
    PG (PostgreSQL client for Node.js) for database access
    Cookie-session for handling user sessions

## Contributing

If you'd like to contribute to LightBnb, please follow these steps:

    Fork the repository.
    Create a new branch for your feature or bug fix.
    Make your changes and commit them to your branch.
    Push your branch to your forked repository.
    Open a pull request from your branch to the main repository.


## Acknowledgments

### LightBnb was created as part of an assignment in the Lighthouse Labs Web Development Bootcamp. Special thanks to the instructors and mentors for their guidance and support.