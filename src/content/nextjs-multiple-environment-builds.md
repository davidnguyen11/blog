---
title: "next.js multiple environment builds"
date: "2018-01-27"
description: "This article talks about how we manage multiple env builds using nextjs."
draft: false
path: "/blog/nextjs-multiple-environment-builds"
---

![building](https://cdn-images-1.medium.com/max/800/1*qFOpudaR2zUk_lS8Xa526A.jpeg "building")

[https://medium.com/chotot/nextjs-multiple-environment-builds-e8b2ccb11c04](https://medium.com/chotot/nextjs-multiple-environment-builds-e8b2ccb11c04)


# Overview

[Next.js](https://github.com/zeit/next.js/) is a minimalistic framework for the universal web application using [ReactJS](https://reactjs.org/). It was open-sourced 25th October 2016. The company behind Next is [ZEIT](https://zeit.co/). It has huge contributors out there to maintain and improve. Next provides easy interfaces for web development and has some advantages such as:
- Supports server rendering natively.
- There are many small examples of integrations between next.js and other libraries or technologies (check them out here).
- The documentation is very clean and up-to-date.
- Next takes care of all basic configs. Allowing to extend configs of webpack or babel…
- It has a huge community to support when we got issues.

Recently, we have used next.js for some experiment projects in our company (You can check [here](https://codeburst.io/next-js-at-chotot-ca9c1520f436) to know why we chose next.js). During development, we met a problem with multiple env builds.

# next build — development vs production

## development

- Next only builds a page that you are visiting.
- Every single changed, Next rebuilds your web app into “.next” directory, but only a page that you are visiting for speed up development.

**For example:**

- Our web app has 6 pages: home (index.js), create new (action.js), listing (listing.js) register & login (auth.js), list of accounts (accounts.js), detail account (detail_account.js).
- When visiting “home” page, Next will bundle everything belongs to “home” page (index.js).
- Similarly with “create new” page, Next bundles everything belongs to “create new” page (action.js) into “.next” directory.

![development](https://cdn-images-1.medium.com/max/1600/0*IIR-nu76WmDWbIw2. "Development")

## production
- Next bundles everything belongs to our web app into “.next” directory.
- When you visit a page, next will not rebuild again because it already built in “.next” directory.

![production](https://cdn-images-1.medium.com/max/1600/0*iZ1gcg7x4tFG4peM. "Production")

# Scenario

In our process, we divided a development environment (env) into 3 parts:
- **Development:** for Engineers to develop features.
- **Staging:** for Quality Assurance (QA) to test features before it comes to real production.
- **Production:** for Users to use features.

Each env uses different configs, API endpoints, resources (CPU, RAM, …). But the staging and production have to be as similar as possible.

Below is our package.json scripts to manage to build and run of our web app

```json
{
    "scripts": {
        "build": "next build",
        "start:development": "node server.js",
        "start:staging": "NODE_ENV=staging node server.js",
        "start:production": "NODE_ENV=production node server.js"
    }
}
```

We have 4 commands. In each environment, we will run with order:
**development**
- npm start

**staging**
- npm run build
- npm run start:staging

**production**
- npm run build
- npm run start:production

After running commands above, we have the **NODE_ENV**, then we can get configs of that **NODE_ENV** to serve our stuff.

```js
const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    api: 'https://api.staging.com',
  },
  staging: {
    api: 'https://api.staging.com',
  },
  production: {
    api: 'https://api.production.com',
  },
}[env];

export default configs;
```

# Problem

While development & production work well. We met a problem at “staging” env. Here is what happened when we build & run our web app in staging env:

- **npm run build:** Next bundles everything (page, resource, …) into “.next” directory.
- **npm run start:staging:** Next detects **NODE_ENV** is not production. It automatically rebuilds our web app with development env everytime you visit a page.

That means in staging env, our web app is treated as development env. So when you visit a page, Next takes time to rebuild it again. It affects our performance and productivity of the team in staging env.

# Solution

We found out that Next only support 2 env: development & production in “run command”. So if you pass NODE_ENV=production to “run command”, Next will not treat your app as development env.

So here are new “run commands” in **package.json** file:

```json
{
    "scripts": {
        "build": "next build",
        "start:development": "node server.js",
        "start:staging": "NODE_ENV=production ENV=staging node server.js",
        "start:production": "NODE_ENV=production ENV=production node server.js"
    }
}
```

In staging & production run commands, we pass **NODE_ENV=production** to notify Next that we want to build our web app in production mode. We also pass another argument called **ENV** to determine the environment value to load env resources from “config.js”.

In config files, we changed to use **ENV** instead of **NODE_ENV**.

```js
const env = process.env.ENV || 'development';

const configs = {
  development: {
    api: 'https://api.staging.com',
  },
  staging: {
    api: 'https://api.staging.com',
  },
  production: {
    api: 'https://api.production.com',
  },
}[env];

export default configs;
```

# Conclusion

This solution works well for our projects using Next. Of course, there are many solutions out there. If you have a better solution, you can give me the feedbacks.

Thank you very much!


