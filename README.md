# Tech-Blog
Module 14 Challenge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents:
- [Description](#Description)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [Usage](#Usage)
- [Preview / Screenshot](#Preview-Screenshot)
- [Contact](#Contact)
- [References](#References)
- [License](#License)


## Description
This project is a Content Management System (CMS)-style blog site designed for developers who write about tech. The application allows users to publish articles, blog posts, and their thoughts and opinions. It features user authentication and a dashboard for managing blog posts.

## Acceptance Criteria
  - GIVEN a CMS-style blog site
  - WHEN I visit the site for the first time
    - THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
 - WHEN I click on the homepage option
    - THEN I am taken to the homepage
 - WHEN I click on any other links in the navigation
    - THEN I am prompted to either sign up or sign in
 - WHEN I choose to sign up
    - THEN I am prompted to create a username and password
 - WHEN I click on the sign-up button
    - THEN my user credentials are saved and I am logged into the site
 - WHEN I revisit the site at a later time and choose to sign in
    - THEN I am prompted to enter my username and password
 - WHEN I am signed in to the site
    -  THEN I see navigation links for the homepage, the dashboard, and the option to log out
 - WHEN I click on the homepage option in the navigation
    - THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
 - WHEN I click on an existing blog post
    - THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
 - WHEN I enter a comment and click on the submit button while signed in
    - THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
 - WHEN I click on the dashboard option in the navigation
    - THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
 - WHEN I click on the button to add a new blog post
    - THEN I am prompted to enter both a title and contents for my blog post
 - WHEN I click on the button to create a new blog post
    - THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
 - WHEN I click on one of my existing posts in the dashboard
    - THEN I am able to delete or update my post and taken back to an updated dashboard
 - WHEN I click on the logout option in the navigation
    - THEN I am signed out of the site
 - WHEN I am idle on the site for more than a set time
    - THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

## Technologies Used
- express
- inquirer@8.2.4
- pg
- console.table
- dotenv
- cfonts

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies:
`npm init -y && npm i express sequelize pg dotenv express-handlebars bcrypt express-session connect-session-sequelize`

   ## Note:
       - Ensure "package.json" is configured with the accurate attributes.
       - Use your DB credentials to access the environment is added to `.env` file in the root directory

3. run `psql`then enter your passcode
4. Run schema command:
    - `\i schema.sql`
    - `\q`
5. Run seed command:
    - `npm run seed`
6. Start the server by running: `npm start` or `node server.js`

## Usage
1. Visit the homepage to view existing blog posts.
2. Sign up for a new account or log in with an existing account.
3. Access the dashboard to create, update, or delete blog posts.
4. Add comments to existing posts.

## Preview / Screenshot


## Contact
For more projects and information about the developer, please visit:
 - https://ajfizzle.github.io/Tech-Blog
 - https://github.com/ajfizzle/Tech-Blog

## References:
- UT Austin Bootcamp - UTA-VIRT-FSF-PT-02-2024-U-LOLC
- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- https://expressjs.com/en/starter/installing.html
- https://www.npmjs.com/package/inquirer/v/8.2.4
- https://docs.npmjs.com/cli/v10/commands/npm-init
- https://www.npmjs.com/package/dotenv#-install
- https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.