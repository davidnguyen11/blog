---
title: "How Chợ Tốt builds the global “Header & Footer” using React"
date: "2019-01-31"
description: "In 2016, Chợ Tốt rebuilt frontend web application using React & Redux for business expansion. Likewise, we also decided to step by step migrate current services to Microservices Architecture..."
draft: false
path: "/blog/how-chotot-builds-global-header-footer-using-react"
---

![How we built the “Header & Footer”](https://thepracticaldev.s3.amazonaws.com/i/xvyynzai3b8i6ikbhwh1.jpeg "How we built the “Header & Footer”")

[https://medium.com/chotot/how-we-built-the-header-footer-a64c15d92f32](https://medium.com/chotot/how-we-built-the-header-footer-a64c15d92f32)

Huge thanks to [Chợ Tốt web engineering team](http://careers.chotot.com/job/frontend-software-engineer/) and especially [Huy Nguyen](https://medium.com/@nguynquchuy_37246) and [Toan Vu](https://medium.com/@vton) for helping!

# Overview
In 2016, [Chợ Tốt](https://www.chotot.com/) rebuilt frontend web application using React & Redux for business expansion. Likewise, we also decided to step by step migrate current services to Microservices Architecture to scale up. To boost the speed of our web app, we split our business into small chunks and each one is an application. Although doing this way reduces the complexity of the business, we faced some challenges:

* **Consistency:** many web apps mean the more work to keep consistency across product features.
* **Reusability:** many web apps mean we need a way to organize and share common components.

One particular feature on our website that has all these challenges is the “Header& Footer”. Typically, the “Header & Footer” is used by all products at Chợ Tốt and it contains links to important pages that potential users will often visit before making a purchase or inquiry.

This topic talks about 3 main points of how we built the “Header & Footer”:

* Architecture
* CSS
* Build process

Before deep dive into the detail, let’s take a look at the principles we keep in mind when we develop this component.

# Principles

**Usability**

We keep in mind the “Simplicity & Efficiency” of the components’ interface. They also help developers integrate easily.

*“Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple“ — Steve Jobs.*

Let’s look at the example of 2 components code as shown:

![Code example](https://cdn-images-1.medium.com/max/800/1*LTsFGDAnw4FWFVgLefOvOQ.jpeg "Code example")

It’s easy to see that if we want to use the component on the left side, we have to read documents carefully to understand the meaning of each prop and what if there is no document?. Developers often dive into the code to see how it works and makes assumptions.

On the other hand, the right side there are only 3 props they need to care about and the name of properties are declarative. With that even though the developers don’t read the document, they still understand it.

*A library is like a product of developers. If it has a good UX (How easy to use it), other developers will be happy to use it.*

**Extensibility & Testability**
With the business expansion, there are a lot of features integrated into the “app-wrapper”. We follow the “Single Responsibility Principle” to design the code base to make it easy to extend and test.

**Less depending on libraries.**
Using many libraries to develop is unnecessary. The more libraries we use, the bigger size of JS file is. It inadvertently slows down the web page loading. Because Chợ Tốt products reply on React & Redux, we decided to keep only those libraries to develop “app-wrapper”.

# I. Architecture

![Architecture](https://cdn-images-1.medium.com/max/800/1*VUbTm3nuTTeF6Ptjrma6Pw.png "Architecture")

The app-wrapper divides into 2 zones

* Component
* Extension

## 1.1. What is the Component zone?

The component zone contains web components need to render the Header & Footer such as:

![What is the Component zone?](https://cdn-images-1.medium.com/max/800/1*1WmIeGbKrdkAnuhn7hDT5w.jpeg "What is the Component zone?")

### 1.1a. Problem

The Microservices Architecture is good for reducing the complexity and unnecessary code of the particular feature under construction. However, with many new features are continually released every 1–2 months and each one has its own “entry point” when we release a new feature, we need to add “entry point” to the “app-wrapper” and publish it with a new version. Then we go to each project to upgrade the “app-wrapper” in order to have an entry point link to this feature.

Additionally, we have a lot of web applications and we have to make sure all of them have the latest version of app-wrapper. What happens if we miss one? It could affect user experience.

### 1.1b. Solution

Because of these reasons, we decided to develop an API to manage entry points, the “app-wrapper” makes a request to fetch a list of menu items from the server and render.

![Sequence diagram](https://cdn-images-1.medium.com/max/800/1*53pphwKU8u8l67GYLyjvmA.png "Sequence diagram")

By doing this way, when we have a new entry point, we only update the entry point at API endpoint and do it once.

## 1.2. What is the Extension zone?

The “app-wrapper” has some social features such as **“Receiving Chat’s Notification”, “Displaying Announcements”**. Those features require a lot of logic and big libraries such as Socket I/O. If we put all the code inside the “app-wrapper”, here what we are going to deal with:
* The code base is going to be huge.
* It hurts “Single Responsibility Principle”. Since the “app-wrapper” take care of displaying Header & Footer. It doesn’t need to take care of other business.
* It unnecessarily becomes more complex.

### 1.2a. Solution

We develop an area called “Extension” zone which allows loading asynchronously the third party services.

![Extension architecture](https://cdn-images-1.medium.com/max/800/1*5oWaI9WxTiDIxHkXoLk8bQ.png "Extension architecture")

*For example:*
*We got the CDN links to services “Receiving Chat Notification” & “Receiving Announcements” (each service is a specific project and the output is a CDN link). Then we only need to register the link to “Extension” zone and let the Extension do the rest.*

By doing this way, we achieve some benefits:
* Delegating all the logic of third-party services to CDN links helps to separate the logic.
* Reducing the size of the main JS file.
* Simplifying code base which helps other engineers easy to improve.

# II. CSS

The “app-wrapper” contains the styles itself. Choosing a way to manage CSS is one of the hardest problems. There are 2 approaches:

**CSS-in-JS**
JS exports CSS to a JS module. This means we could import CSS directly to JS code.

![CSS-in-JS](https://cdn-images-1.medium.com/max/800/1*ZUc3qz2HMYOjiyKafq2mWQ.png "CSS-in-JS")

**CSS file**

This is the original method. All CSS is bundled to CSS file (style.css).

![CSS file](https://cdn-images-1.medium.com/max/800/1*Y0Cb4386nPbRNY_grcN4jA.png "CSS file")

## 2.1. Approach

Since all products at Chợ Tốt use JS to develop and the “app-wrapper” is a library which needs to provide less configuration for developers to integrate to main apps. For this reason, we decided to choose “CSS-in-JS” approach to manage styles of “app-wrapper”.

There are some libraries help to apply “CSS-in-JS” approach such as “styled-components”, “JSS”,… However, we have various teams and each team has its own style. Some use “CSS-in-JS”, some use “CSS file” to develop web apps. So the question is “Is there any method that could fit all?”. And we came with 1 solution that instead of using CSS-in-JS frameworks, we choose “[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)” feature of ES6 to develop CSS.

![Template strings](https://cdn-images-1.medium.com/max/800/1*Llc4V2XeNc5AjqwGw6TZCQ.png "Template strings")

After using this approach. Everything works pretty well. However, we encountered 2 big problems in the production environment.

## 2.2. Problem
* CSS is not minified.
* CSS does not contain prefixes for old browsers.

![CSS is not minified & not contain prefixes](https://cdn-images-1.medium.com/max/800/1*t_GpRa50Mkef_ZE0zfpSKw.png "CSS is not minified & not contain prefixes")

## 2.3. Solution
After running the build command to compile ES6 to ES5, we run another script to add prefixes & minify the CSS.

We chose [Gulp](https://gulpjs.com/) to customize the build process by adding the post-build stage with 2 tasks:
* Minifying
* Autoprefix

For example:
![scripts](https://cdn-images-1.medium.com/max/800/1*4tHxkCFEuC4A7lfUJrVsIg.png "scripts")

It means after we ran the build command successfully

```bash
npm run build
```

The post-build command is automatically executed. Below is the result applied this method.

![Final CSS](https://cdn-images-1.medium.com/max/800/1*cSgmGi2dfka1GWt3OP8-sg.png "Final CSS")

# III. Build process
The build process is the way we convert JS code from ES6 to ES5 by using [Babel CLI](https://babeljs.io/docs/en/babel-cli).

![Build process](https://cdn-images-1.medium.com/max/800/1*-YZ5xxq8lzP-Yb9GMMEZTw.png "Build process")

The build process has 2 stages.

* Stage 1 (build): It uses babel CLI to compile the ES6 code to ES5 code.
* Stage 2 (postbuild): It runs gulp tasks to minify & adds prefixes to CSS string from the build directory of stage 1.

After we finish the build process, we version the package and publish to private npm registry. All the projects only need to install a newer version of the package and enjoy.

# Usage
We have just described the detail of “How we built the Header & Footer”. Now let’s have a quick look at the usage of the app-wrapper component.

![Usage 1](https://cdn-images-1.medium.com/max/800/1*2JZ2Vn8N7fFFet0jU8O-EQ.png "Usage 1")

with next.js

![Usage 2](https://cdn-images-1.medium.com/max/800/1*JNM2ABOo_ijL-hEbimPyPw.png "Usage 2")

**Mobile demo**

![Mobile demo](https://cdn-images-1.medium.com/max/800/1*8-2AtJ9DlqcOWS8spaBEhg.gif "Mobile demo")

**Desktop demo**

![Desktop demo](https://cdn-images-1.medium.com/max/800/1*FiCyg4tz6K3gjenLHnY02Q.gif "Desktop demo")

# Conclusion
Currently, the app-wrapper component is used by all the Chợ Tốt’s products.
* https://www.chotot.com/
* https://xe.chotot.com/
* https://nha.chotot.com/

and more…

We solved the 2 problems mentioned at the beginning of the post: **“Consistency & Reusability”**.

Besides that, we could bring the “app-wrapper” to the next level to become a common library.
* Apply the Context API which allows easy to change a theme such as color, icon, logo, … based on the business.
* Integrate CI/CD for testing, deployment, …
* Consider integrating strong type system such as [Flow Type](https://flow.org/), [TypeScript](https://www.typescriptlang.org/)