# Goods Exchange
A web application for exchanging goods.

## Description
Find great goods in your area and swap your stuff for free in the new SwapOldStuff.
You can find or publish baby stuff (kids grow up so fast, don't they)? Check our electronics or games categories when you want to try something new or get bored with stuff you have. Fill your house with home appliances and new furniture. Pick up new apparel, when you have nothing to wear and check more item categories to swap your unused things.
Imagine garage sale of the whole state, but it’s on your smartphone and much more convenient.

## Key features
- [x] Search
- [x] User authentication.
- [x] Comment.
- [ ] Responsive

## Development

We have developed the client using React. Used React Router and functional components. Primarily used Bootstrap to style everything. Used React hooks for state management, and a little bit of Redux for global data such as signed-in user information. Used Axios to make API requests.


## File structure
- #### `frontend` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `redux` - Used as a data store for any UI layer.
    - #### `routes.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
- #### `backend` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `middleware` - Functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.
- #### `server.js` - Defines npm behaviors and packages for the client
- #### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
- #### `.gitignore` - Tells git which files to ignore
- #### `README` - This file!


## Available Scripts
Clone the repository-https://github.com/jainam2385/Goods-Exchange

In the project directory, you can run:

### `npm run start`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run server`

Runs just the server in development mode.<br>


## Future Scope
1. We can categorize each product uploaded by product condition and product type.
2. Provide complete process of shipping, tracking and delivery of product exchanged.

## Contributors
1. Jainam Shah - 1911120
2. Swanand Apte - 1911125
3. Dhairya Salot - 1911114
