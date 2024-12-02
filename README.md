Project TODO Frontend
=============

## Installation

Install Node.js. I recommend the version I use:

I suggest using nvm v1.1.12.

```
nvm install
```

Alternatively, you can use the following versions:

```
Node.js: v20.18.0
npm: v10.8.2
```

After completing the installation, run:

```
cd front-todo // Skip this step if you're already in the folder
npm install
```

This will install all the necessary packages to set up the frontend.

Environment Configuration
Create a file named .env.local and include the following information:

```
VITE_API_URL=http://localhost:3000/api
```

Ensure you're always using the correct URL for the Node.js server.

Running the Application

```
npm run dev
```

![Descripción de la imagen](/tutorial/front_local.jpg)

Finally, you can access the application via the default URL:

[http://localhost:5173](http://localhost:5173)

Note: If you change the port, make sure to replace 5173 with the new port number, or update the entire URL accordingly.

