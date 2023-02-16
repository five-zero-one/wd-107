# Backend Assessment

## Introduction

**Welcome to the Backend Assessment!**

This assessment is designed to help you practice the skills and knowledge you have acquired from the _WD-107 Backend course_. You will be building a `Node.js` `Express` `MongoDB` application to make API endpoints and combine data from the [Unsplash API](https://unsplash.com/documentation). You will create simple and complex `GET` routes, as well as full `CRUD` functionality for a `favoriteUsers` collection. You will also need to connect your app to a `MongoDB` database, and create a full login system with Authentication using `JWT`.

To complete this assessment, complete every task in **Parts I** through **VII** outlined below.

**Requirements to Pass**

- All routes must return the correct status code and data.
- Routes, controllers, models, middleware, etc. must be created in the appropriate files and folders.
- In `Part I` through `III`, `async/await` and `try/catch` blocks must be used to make requests and handle errors rather than promise chaining.
- Errors must be handled and returned to the user.
- The `db.js` file must be set up correctly.
- The `MongoDB` database must be set up correctly.
- The login system must be secured using `JWT`.
- Your code must be clean and readable. It should follow the DRY principle.
- Routes created in **Part VI** should be accessed only by users who are logged in.
- Error handling middleware is implemented for all `favorites` routes (created in **Part VI**).
- Auth middleware is implemented for all `favorites` routes (created in **Part VI**).

**Important Note(s)**

- Use [axios](https://www.npmjs.com/package/axios) to make requests to the [Unsplash API](https://unsplash.com/documentation).
- Save all sensitive passwords and keys to an `.env` file.
- Upon completing this assessment, submit your Github repo link and the `.env` file.

**Documentation**

- [Postman documentation](https://learning.postman.com/docs/getting-started/introduction/)
- [axios documentation](https://www.npmjs.com/package/axios)
- [Express documentation](https://expressjs.com/en/4x/api.html)
- [Unsplash API](https://unsplash.com/documentation)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [JWT](https://jwt.io/introduction)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)

## API Routes

|method|route|protected?|payload?|query?|
|:----|:----|:----|:----|:----|
|GET|/api/photos|||`page`, `perPage`|
|GET|/api/photos/`:id`||||
|GET|/api/photos/user/`:username`||||
|POST|/api/users/register||`email`, `username`, `password`||
|POST|/api/users/login||`email`, `password`||
|POST|/api/users/me|**Y**|||
|POST|/api/photos/favorites|**Y**|`username`,`url`,`description`,`explanation`||
|GET|/api/photos/favorites|**Y**|||
|PUT|/api/photos/favorites/`:id`|**Y**|`explanation`||
|DELETE|/api/photos/favorites/`:id`|**Y**|||
