# Spotify API Authentication Foundation

This project contains a foundation for authentication via OAuth 2.0 using the _'Authorization Code Flow'_ against the [Spotify Web API](https://developer.spotify.com/web-api/authorization-guide/).

The project makes use of [Node.js](http://www.nodejs.org/download/), [Fastify](https://www.fastify.io/) and [Axios](https://github.com/axios/axios).

## Installation

This foundation runs on on Node.js. For installation of Node.js refer to [its website](http://www.nodejs.org/download/).

Once installed, clone the repository and install its dependencies by running the command:

    $ yarn install

### Credentials And Settings

You will need to create and register an app to get your own credentials from Spotify's Developer Dashboard.

To do so, head over to [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

#### URLs

For this example, the registered Redirect URI in the app is:

- http://localhost:3000/callback

The url for the website in this foundation is:

- http://localhost:5000

You may register whatever 'Redirect URI' you would like and point the website url to whatever address your website is running on.

#### Scopes

Scopes enable your application to access specific API endpoints on behalf of a user. The set of scopes you pass in your call determines the access permissions that the user is required to grant. [See available scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).

#### Settings

Once you have the credentials, the urls and your scopes make sure to update:

    settings.js

## Run it

In order to run it make sure that your website is up and running. Then, open the 'spotify-api-auth-foundation' folder and run the command:

\$ yarn run server

And finally a browser and go to `http://localhost:3000/login`.
