---
title: "next.js at Cho Tot"
date: "2017-06-16"
description: "Every day, Chợ tốt (Chotot) receives over 1 million visits cross platforms, most of the traffic comes from mobile devices..."
draft: false
path: "/blog/nextjs-at-chotot"
---

![Action asphalt back light](https://miro.medium.com/max/1400/1*LN1L-vuR_vEcJosbO7vtCQ.jpeg)

## Overview

Every day, [Chợ tốt](https://www.chotot.com/) (Chotot) receives over 1 million visits cross platforms, most of the traffic comes from mobile devices. It is really important for us to develop products that can run across devices. In 2016, we switched to a new stack to rebuild our products.

The technologies that we chose for our new stack are: [React](https://reactjs.org/), [Redux](https://github.com/reduxjs/redux) & [NodeJS](https://nodejs.org/en/) to build the new web app. React makes it easy to build web components that can be reused in other products. Redux is the main channel communicating between the Back End & Front End. NodeJS builds a web server. To support SEO with this stack, we implement the [Universal Web Application](https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/) approach.

## First boilerplate

Base on a starter boilerplate put together by erikras (link here) to experiment with our new web stack. However, we encountered problems in production.

### problem

In production, if the traffic is high, the web server will stop responding to the client. At first, we optimized our codebase but the result was still the same. We resolved to use client-side rendering instead of server-side rendering. But the challenge is if we turn off server rendering, SEO will be affected.

### solution 1

Search engines now support Javascript in their crawlers (check here for more detail). Our first solution was to delegate the rendering page to client-side. Here is our analysis:
SEO was affected negatively
Our ranking dropped
The crawlers were still indexing but it was slower than using server-side rendering. So delegating all missions to client-side did not work for us.

### solution 2

The next solution was to split the project into 2 and deploy it to 2 different servers. One serves users with client-side rendering. Another one serves crawlers bot from Google, Facebook,... with server-side rendering.

![solution 2](https://miro.medium.com/max/1300/1*qVApQ-95VJPJMmCEw7L3JQ.png)

This solution worked fine. However, we were also looking for another boilerplate to replace it.

### Why did we want to change?

- When deploying code changes we had to deploy the new version to 2 different servers.
- The boilerplate was out of date.
- The time to rebuild code at development was too slow. It took more than 10 seconds to rebuild every single change.
- We wanted to apply new tools to have good experience for Engineers and good performance for the product as well: webpack 2 with many improvements like [Tree shaking](https://webpack.js.org/guides/tree-shaking/), [Dynamic import](https://jamie.build/react-loadable.html), ...

## next.js the rescuer

After looking around some repositories, we considered next.js as a potential replacement for several reasons:

- Supports server rendering natively.
- There are many small examples on integrations between next.js and other libraries or technologies (check them out here).
- The documentation is very clean and up-to-date.
- next.js takes care of all basic configs. Allowing to extend configs of webpack or babel...

I will talk about the way we applied next.js in our products including some issues and solutions. I will provide the sample at the end of this article.

### redux

We chose redux to manage application states. next.js provides a [redux wrapper](https://github.com/kirill-konshin/next-redux-wrapper) to help integrate with it easier and more consistent (You can visit [here](https://github.com/zeit/next.js/tree/master/examples/with-redux) to see example)

```js
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '@/store'

class ExamplePage extends React.Component {
  render() {
    <h1>Hello Next.js</h1>
  }
}

export default withRedux(initStore, (state) => ({
  newsListing: state.newsListing
}))(ExamplePage)
```

Here we can see that Redux was wrapped by next-redux-wrapper as a [Higher Order Component (H.O.C)](https://reactjs.org/docs/higher-order-components.html). To use redux, we have to wrap our component with the function ‘withRedux’.

### routing

"next.js" provides a very clean directory structure. There is a special directory “pages”. When you put all your React components into that one, next.js automatically executes:

- Code splitting
- Routing
- Hot code reloading and universal (server-side and client-side) rendering.

You just don’t have to worry about configurations of all that stuff, next.js will manage them.

We created 2 directories to place our React component. The first one is pages directory. The second one is the components directory.

- **pages:** we use it for containers in redux.
- **components:** to store stateful & stateless component in react.

### static resources

next.js also provides a static directory to serve static resources for the web application. All you have to do is place all resources like images, fonts, stylesheets, … into the ‘static’ directory. Then just use it as follows:

![Static directory](https://miro.medium.com/max/1016/1*q7ApZv_Ch3jG9LsClb_rkA.png)

**image**

```bash
<img src='/static/img/logo.png' />
```

**CSS**

```bash
<link rel='stylesheet' href='/static/css/app.css' />
```

If your module contains many nested directories, this option is going to be complicated. There are many ways to solve this:

**Alias config of webpack**

You can use the [alias feature](https://webpack.js.org/configuration/resolve/#resolve-alias) of webpack to define alias names for your modules (You can check out how to extend webpack config in next.js here). And then just import it as follows:

*next.config.js*

```js
module.exports = {
  webpack: (config, { dev }) => {
    config.alias: {
       components_example: path.resolve(__dirname, '../components'),
    }
    return config
  },
}
```

and use it like

```bash
import CSSTag from 'components_example/CSSTag'
```

But every time you add a new directory as a module container, you have to define it in your webpack config.

You can set NODE_PATH into our commands in package.json like:

*package.json*

```json
{
   "scripts": {
      "dev": "NODE_PATH=./ next"
    }
}
```

By setting NODE_PATH, our current position is now at the root directory when we run command “npm run dev”. We can import as follows:

```bash
import CSSTag from 'components/CSSTag'
```

However, this will complicate our commands and if the commands require root path, NODE_PATH needs to be added.

**babel plugins**

We resolved this by using babel plugin provided by next.js. [babel-plugin-root-import](https://www.npmjs.com/package/babel-plugin-root-import) allows us to configure our root path with specified characters in .babelrc (You can learn how to customize babel config [here](https://github.com/zeit/next.js#customizing-babel-config)).

.babelrc

```json
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    ["babel-plugin-root-import", [
      {
        "rootPathPrefix": "@"
      }
    ]]
  ]
}
```

The root path is “@”. So you can import a module at components:

```bash
import CSSTag from '@/components/CSSTag'
```

## CSS development

To develop CSS we use the pre-processor Sass with SCSS syntax. Sass provides many functionalities (check them out here). It allows us to:

- Write functions (@mixin)
- Define variables
- Call a function (@include)
- We can write CSS with module scope

To integrate SCSS with next.js, we also referenced this example.

**For example:**

*/styles/index.scss*

```css
.indexPage {
  .cardItem {
    margin-bottom: 15px;
  }
}
```

*/pages/index.js*

```js
import React from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore } from '@/store'

// style
import style from '@/styles/index.scss'

class IndexPage extends React.Component {
  render() {
    <div>
      <div className="indexPage">
        Hello I am Index page!!!
      </div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </div>
  }
}

export default withRedux(initStore, (state) => ({
  newsListing: state.newsListing
}))(IndexPage)
```
### problem

In production mode, when you browse your site and use "View Page Source" you will see styles are not minified in the HTML document. If our styles are large, that means the time to ship your page to the client is going to increase.

![Page source](https://miro.medium.com/max/1400/1*41bdhnJ61XBQB2OaWvmAjA.png)

### solution

We use [gulp](https://gulpjs.com/) and [postCSS CLI](https://github.com/postcss/postcss-cli) to manage CSS in production mode. The output of this step will produce an app.css file which includes all minified styles used in our web application.

The idea is each component will have a style file (*.scss). We divided the way to develop CSS with 2 environments.

### development

We created a stateless component called CSSTag to manage CSS at development.

```js
import React from 'react'

const dev = process.env.NODE_ENV !== 'production'

// Note
// this component will only work for ENV = development
function CSSTag (props) {
  const { style } = props
  const element = dev && <style dangerouslySetInnerHTML={{ __html: style }} />
  return element
}

export default CSSTag
```

and we can use it like this:

```bash
import style from '@/styles/Example.scss'

<CSSTag style={style} />
```

```js
import React from 'react'

import CSSTag from '@/components/CSSTag';

// style
import style from '@/styles/Example.scss'

class Example extends React.Component {
  render () {
    return (
      <div>
        <div className='example'>
          <h1>Hello Example Component</h1>
        </div>
        <CSSTag style={style} />
      </div>
    )
  }
}

export default Example
```

### production

We created ‘app.scss’ which includes all styles of the web application, then we used gulp to build final CSS based on ‘app.scss’.

The final CSS has to meet some rules:

- Contains all styles of web application
- Auto-prefix
- Minified

*app.scss*
```bash
// components
@import "./variables";
@import "./ultilities";
@import "./global.scss";
@import "./components/ToolBar";

// pages
@import "./index.scss";
```

*gulpfile.js*
```js
const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')

gulp.task('app', () => {
  return gulp.src('./styles/**/app.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(minifyCSS())
             .pipe(gulp.dest('./static/css'))
})

gulp.task('default', ['app'])
```

### Auto-prefix with postCSS

The last step to produce final CSS is auto-prefix. We are using postCSS CLI to auto-prefix final CSS after gulp bundled it. Then includes final CSS to our document via "_document.js" (you can check out here to know how to use extend document)

Here is the diagram that shows the way we manage CSS in production mode:

![Production CSS building with gulp](https://miro.medium.com/max/1400/1*0585i_utNTYz-bYO0VaYZQ.png)

## Result

After completed a project with “next.js”, we used lighthouse to audit our web page. Here is a result.

![Light-house new result](https://miro.medium.com/max/1400/1*c8ZAblSWnxG2lerweQWlaA.jpeg)

Here is a result of the old one:

![Light-house old result](https://miro.medium.com/max/1400/1*UMW4ExtkVDy6wgN-mz_bXg.png)

You can see here the [Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/) of the first result we only need 1.5s for first meaningful paint while the second result is 9.5s. We improved a lot of performance with next.js.

## Demo

Here is a full demo: [https://github.com/davidnguyen179/nextjs-full-demo](https://github.com/davidnguyen179/nextjs-full-demo)

## What’s next?

Next.js gives us a lot of benefits so far:

- Performance
- Lightweight
- Easy to use
- Well document
- Strong support from the community
