 # Vue - Netlify - Fauna Starter Kit

A [JAM stack](https://jamstack.org/) template for building CRUD applications with authentication ready to go. Uses [Vue](https://vuejs.org/) for the front-end, [Netlify](https://www.netlify.com/) for APIs (via Netlify Functions) and [Fauna](https://www.netlify.com/) for the database. 

This is an entirely serverless stack which leans heavily on Netlify and Fauna for the backend. At the time of writing this, these services offer generous free tiers which means anyone can get started and deploy and host this completely free.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chiubaca/vue-netlify-fauna-starter-kit)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development via [Netlify Dev](https://www.netlify.com/products/dev/). (Make sure you have Netlify Dev installed with `npm install netlify-cli -g`)

```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Runs a build and deploys to Netlify on a preview URL
```
npm run deploy
```

### Runs a build and deploys to Netlify on your master URL
```
npm run deploy:prod
```

### Runs unit tests with Jest
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## App Features
TODO...

## Why This Exists

This template was made to be a reusable template to build upon and create more complex CRUD applications with authentication ready to go. This was built for my own learning purposes and was heavily inspired from the following Github repos which also leverage Netlify Identity, Functions and FaunaDB. 

- https://github.com/shortdiv/gotruejs-in-vue
- https://github.com/fauna/netlify-faunadb-todomvc
- https://github.com/netlify/netlify-faunadb-example (doesn't have authentication)