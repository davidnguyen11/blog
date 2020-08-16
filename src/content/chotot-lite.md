---
title: 'Chợ Tốt lite'
date: '2020-03-22'
description: 'The story about building Chợ Tốt lite version for low-end devices'
draft: false
path: '/blog/chotot-lite'
---

![Minimalism](https://miro.medium.com/max/7000/1*xrlv9agtvdL3KJtKK3WbZQ.jpeg)

# Overview

In 2016, I had the pleasure of being a part of the team that renewed Chợ Tốt’s web application. The new application contributed immensely to Chợ Tốt’s growth. The new version of Chợ Tốt’s application included 2 major changes :

- **UI (User Interface):** we focused on mobile with a new UX fit for the mobile site.
- **Technologies:** we decided to use ReactJS & Redux as our main stack.

When the new version came out, we expected to increase traffic and user engagement. However, after 1 month in production, we received some negative feedback and our traffic dropped. One of the reasons was most of the traffic came from low-end phones such as:

- Windows Lumia
- Android 2
- Android 3
- Android 4

We decided to test with these devices and found the following issues:

- Our UI layout was broken
- JS code at the client-side somehow did not work
- The load time & interaction was very slow
- Some of the old devices render blank

We tried to fix all of those issues but we just could not fix them all. The more code we added, the more unstable the product was and the file size was just increasing. So we decided to create a brand new product with the sole purpose of supporting only old devices. And we called it “Chợ Tốt lite”. So in this article, I want to discuss 4 major parts of in the development process of the lite version:

- Server or Client rendering
- UI / UX
- Implementation & Problem
- Testing

# Server or Client rendering

There are 2 approaches to develop a web app:

- **Server Side Rendering:** which lets the server compute and feed the client HTML data. Based on the response, the browser renders the web page.
- **Client Side Rendering:** the response from the server is an empty HTML file with CSS and JS links. Then the browser downloads and executes the JS & CSS files to render.

We decided to go with server side rendering based on the aforementioned issues in the “Overview” and the following constraints of the target device’s lite version:

- Poor power
- Poor memory
- Poor CPU & GPU

Those constraints make the browser of the low-end phone do a lot of work when a page first loaded and the UI took a long time to display.

# UI / UX

We decided to keep things simple in this version by cutting down on not so important features and contents and only keep the most useful features to provide the best user experience despite the target devices limited capabilities.

Here is why:

- Old devices have their limits (low CPU, GPU, low memory, …)
- The more features we add, the more work that the browser has to do and it affects the performance of the device
- The more complicated the UI is, the more time it takes browsers to compute and render

Here is an example of our optimized UI:

![UI of ad item](https://miro.medium.com/max/1536/1*1i7BdBOxdEYBgKZQ9NxO1Q.png)

![Detail page](https://miro.medium.com/max/1772/1*9srzXdLiLiLjRXA46VRqrQ.png)

![Listing page](https://miro.medium.com/max/1744/1*A2Mf_mnIisWTTMe4x66YnQ.png)

# Implementation

## Boilerplate

To support server-rendering, we decided to use NextJS as our main boilerplate for 3 main reasons:

- Fast setup
- Supports SSR natively
- Good community support

You can also check more details of our case study [here](https://medium.com/chotot/next-js-at-chotot-ca9c1520f436)

## Web components

In the beginning, we thought we could reuse web components from our main products ([chotot](https://www.chotot.com/) — [xe](https://xe.chotot.com/) — [nha](https://nha.chotot.com/)). But when we integrated it into a lite version, the layout just broke because of the lack of support from the old device’s browser and our web components were using some attributes that didn’t support old browsers. Therefore, We developed new web components that only supported the old browser. It costed less than re-factoring the current one.

> Note: You can use caniuse to check CSS attributes support

## Static image

In our products, most of the icons we used were SVG. But when we checked it with “[caniuse](https://caniuse.com/)”, here is what we found:

![caniuse SVG support](https://miro.medium.com/max/4712/1*6NJDkSVYgTzOBZHAu9FjrA.png)

As you can see in the image above, the SVG doesn’t support Android 2. As a result, we went with PNG.

## CSS

The layout of a web app is usually simple and contents are organized in rows. Besides that, we didn’t have many complicated web components. So using a CSS framework was unnecessary.

Furthermore, improvements in web development allowed us to make use of CSS in JS. That means server response not only includes HTML and data but also CSS in `<style>` tags. Using this approach helped us resolve the issue of the browser to getting stuck at [render-blocking resources](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css).

# Problem

After completing development, we tested on real devices like Android 2 phones, Android 3 phones, Windows Lumia phones. Here is what we found:

- Server rendering was good & fast
- UI was up to our standard
- JS code didn’t work in devices with Android 2 & 3.

All events on the web page (e.g. click button, swipe images, …) didn’t work and we had no way to debug such as opening the Devtools to check the errors.

In order to diagnose a cause, we added a simple button to the page used VanillaJS to listen to the click event. It turns out it worked. So our conclusion was that React@15 “client-side” did not support Android 2 & 3.

**Solution**
Fortunately, ReactDOM worked well, so then we only cared about how to make JS work on the client-side. We realized that we didn’t have many events on a page, because we cut down a lot of features to support low-end phones. It turns out we only had to click and swipe for the slideshow to work.

So we decided to develop VanillaJS lib to catch all events needed for a page. After completing development, we made a bundle and included it to the page after the main scripts are executed.

![Build flow](https://miro.medium.com/max/4426/1*30vaN0UE2zVvVdadmsgawQ.png)

Problem solved!

# Testing

To test the new version, we had some old devices but we could not run testing during development. So we use 1 service called “[Browserstack](https://www.browserstack.com/)” for development and QA testing, we used real devices.

Here are 2 devices we used to test:

![Samsung galaxy young](https://miro.medium.com/max/698/1*yEf9U8XACh1VymlcO8tz5A.jpeg)

![Windows Lumia](https://miro.medium.com/max/1280/1*3-dPkvFNn-h9_sok98jeag.jpeg)

# Conclusion

After completing the whole page, we ran an audit with the lighthouse tool from Google. Here were our results:

![Lighthouse result](https://miro.medium.com/max/3388/1*7sqUZXYKenzBI4ocvuq5pw.png)

With this version, our main products could remove some of the hack codes which were unstable in the long term and we could try new stuff in our main products without worrying about breaking on old devices.
