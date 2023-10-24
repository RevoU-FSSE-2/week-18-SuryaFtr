# Fullstack Integration - JSON Web Token(JWT), Authentication and Authorization

## Introduction

Implementation JWT for authentication and authorization for express js app for server side(Backend).

Which is have this feature on list below :
- Register user.
- Access, refresh token and expire time.
- Login session, cookies access, refresh with max age expire of jwt.
- Logout session and clearing cookies
- Request reset password and reset password.
- User roles based authorization.
- Post article.
- Limitation data fetching, for every user.
- Limitation login for request.

## Content
* Introduction
* Content
* Requirement Tech and Package
* Getting Started
* Project Explaination

## Requirement Tech and Package

- **express** 
- **mongoose** 
- **jsonwebtoken**
- **memory-cache** 
- **crypto-js** 
- **body-parser** 
- **cookie-parser** 
- **dotenv** 
- **express-rate-limit** 
- **helmet**
- **morgan**

## Getting Started

### 1. Prerequisites

First, make sure you already have:

- Git installed.
- Node.js and npm installed.
- A text editor or IDE (e.g., Visual Studio Code).
- Postman installed, to testing server endpoint

### 2. Clone the Repository

- Firstly, clone this repository to local repository
```bash
git clone <repository-url>
cd <repository-folder-name>
```

### 3. Install all required packages dependencies

```bash
npm install
```

### 4. Starting the project locally

- Copy the env files
```
cp .env.example .env
```

- Change MONGO_URL to your MONGO connection

- Add permission to db
```
npm run make_perm
```

- Run Backend Server

```bash
npm start
```

- Open ``Postman`` application, and import file on folder ``docs`` to postman collection.

## Project Explaination

Routes Endpoint
1. Register

    ``Register : POST('/register') -> is for register new user``

2. Login/Logout

    ``Login : POST('/login') -> is for regular login without session & cookie``

    ``Login Session : POST('/login_session') -> is for login with session & cookie``

    ``Logout Session : POST('/logout_session') -> is for logout session & clearing cookie``

3. Attach and Detach User Permisson

    ``Attach Permission : POST('/attachperm') -> is for add/update permission to user``

    ``Detach Permission : POST('/detachperm') -> is for remove permission to user``

3. Check user info 

    ``User : GET('/user') -> is for checking user info role``

    ``Super user : GET('/admin') -> is for checking super user info role``

4. Refresh Token 

    ``Refresh Token : POST('/refresh') -> is for re-new login token session, without login manually``

5. Request & Reset Password

    ``Request Reset Password : POST('/requestreset') -> is for asking a key to requesting new reset password``

    ``Reset Password : POST('/reset') -> is for processing new reset password``

6.  To Do List 

    ``Add ToDoList : POST('/posting') -> is for creating new ToDoList data``

    ``View ToDoList : GET('/posting') -> is for view ToDoList data``

    ``Update ToDoList : PUT('/posting/:id') -> is for update ToDoList data``

    ``Delete ToDoList : DELETE('/posting/:id') -> is for delete ToDoList data``

