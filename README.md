 [![Netlify Status](https://api.netlify.com/api/v1/badges/4ae54114-0254-4a6d-8c69-50babf908578/deploy-status)](https://app.netlify.com/sites/vue-netlify-fauna/deploys)
 ![](https://user-images.githubusercontent.com/18376481/78156268-78aed080-7436-11ea-9da7-57d83ec5ec8a.png)
 # Vue - Netlify - Fauna
 ## A serverless stack with authentication ready to go! 

This serverless stack uses [Vue](https://vuejs.org/) for the front-end, [Netlify](https://www.netlify.com/) for APIs (via Netlify Functions) and [Fauna](https://www.netlify.com/) for persistent data storage. 

At the time of publishing this, Netlify and Fauna offer generous free tiers which means anyone can get started, deploy and host this completely free.

## Prerequisite project setup

Don't skip these steps ❗❗

1. If you don't have a Fauna account yet, sign up [here](https://dashboard.fauna.com/accounts/login). Create your first db and generate a server key in just few clicks.

![](https://user-images.githubusercontent.com/18376481/74045740-35e7f380-49c5-11ea-938f-48470242c1b3.gif)

2. With your server key ready, you can easily clone this repo and deploy this app in a few seconds by clicking this button:
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chiubaca/vue-netlify-fauna-starter-kit)


3. Enable Identity on your newly deployed Netlify site otherwise signups and logins wont work. Also remember to enable Google as an External Provider. This is can found in "Settings & Usage" in the Idenity tab, then scroll down to "External Providers" and select Google in the add providers drop down. 

![Enable Netlify Identity](https://user-images.githubusercontent.com/18376481/74047309-07b7e300-49c8-11ea-90c9-688bf226d0d5.gif)

It will only take a few moments for Netlify to deploy the site, once ready, click on your assigned URL and you have an fully functioning CRUD application with persistent storage and a login system all ready to go! 

[Demo site](https://vue-netlify-fauna.netlify.com/)

## Further development setup
```
npm install
```

### Compiles and hot-reloads for development via [Netlify Dev](https://www.netlify.com/products/dev/). (Make sure you have Netlify Dev installed with `npm install netlify-cli -g`)

```
npm start
```

### Builds the app and deploys to Netlify on a preview URL
```
npm run deploy:preview
```

### Builds the app and deploys to Netlify on your master URL
```
npm run deploy:prod
```

### Runs unit tests with Jest
```
npm run test:unit
```

## Breakdown 
I wrote a blog explaining how everything works:
- https://dev.to/chiubaca/build-a-serverless-crud-app-using-vue-js-netlify-and-faunadb-5dno

## Why This Exists

I built this template because pretty much all my side projects need persistent data storage and a login system. It was also a great opportunity to learn more about the Netlify eco system including Netlify Functions, Identity and Netlify Dev. Full credits need to go to the following repos which I have effectively mashed together.

- https://github.com/shortdiv/gotruejs-in-vue
- https://github.com/fauna/netlify-faunadb-todomvc
- https://github.com/netlify/netlify-faunadb-example
