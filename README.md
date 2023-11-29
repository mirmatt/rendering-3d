This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Web Application to creature and manipulate Meshes in a sandbox environment.
Realized using Three JS (https://threejs.org/)

## Initializing web-app
- After cloning the project either run 'npm install' while in the root folder, or see the Docker section
- Run the web app using 'npm start'. By default the app will be served on http://localhost:3000/

## Building Docker Container
- cd into the root of the folder
- run docker build . -t "name-of-the-image" to build the image itself
- Once the image has been build, use docker run -p 3000:3000 --name name-of-the-container "name-of-the-image"
- the image while building will download automatically the required packages and it will default to http://localhost:3000/ aswell

## Building the application
- While in the root, run "npm run build". This will create a "build" directory containing the optimized code
- execute "serve -s .\build\" to launch the app
- if the serve command has not been found, install it via "npm install -g serve"

## Structure of the app
- The app all resides inside the .\src folder
- inside it, you can find
	- components -> contains the various React sub-components, used to assemble the page.
	- data -> Holds all the static data used by the application
	- icons -> small images destined to be used inside components as a minor part
	- pages -> base routes for the web app
	- types -> contains the interfaces and types used by typescript

## Envinroment
- Tested on both Firefox (120.0) and Chrome (119.0.6045.199)