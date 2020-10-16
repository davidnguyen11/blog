---
title: 'Develop Spotify Player web extension'
date: '2020-08-15'
description: 'The goal of Spotify extension is to provide basic features that allow the user to quickly and easily control the Spotify app'
draft: false
path: '/blog/develop-spotify-player-web-extension'
---

![Puzzle](https://user-images.githubusercontent.com/6290720/90327669-19aabc00-dfd1-11ea-8d48-0042116ebafd.jpg)

# Motivation

When we are working or just browsing it is inconvenient to have to switch to another window to play / pause or jump to previous tracks or forward to upcoming tracks. Also, we lose focus or get distracted once we navigate away from our current window and open Spotify. With this simple extension we can eliminate the need to navigate away from your current window to control Spotify. This extension has another nifty feature. With a quick right click on the widget, you can search a song by name. So for example if you hear a tune on Youtube you can quickly search it on Spotify without navigating away from your current window. Then you can maybe add it to a playlist later.

# UX / UI

## How many features does it support?

The goal of Spotify extension is to provide basic features that allow the user to quickly and easily control the Spotify app. Below is the list of basic features:

- Play / Pause
- Next / Previous
- Like
- Right click & search song in Spotify

## Right click to search a song

Sometimes, we unintentionally find a good melody on youtube or some other websites and we want to find that song in Spotify to add to a playlist. We usually:

- highlight & copy song title
- go to Spotify desktop app or web player
- search by song name
- add it to a playlist

As you can see it takes a few steps and we have to switch context (open web player with a new tab or switch to desktop app) to achieve the goal. So finding optimal way to do this is needed to reduce switching context (which can lead to lost focus)

- Is it possible to find a song in Spotify while I am on the current page (where I found the song)?
- If it is possible, how can I make it natural for users?

Here are the steps that I found optimal & natural:

- highlight the song title
- right click on the song, select item search in Spotify
- navigate to Spotify web player with that song name

From there I can add the song to my playlist. Everything is done in the browser.

![Right click to search a song](https://user-images.githubusercontent.com/6290720/90327706-8de55f80-dfd1-11ea-846f-179219950c48.png)

## What kind of information needs to be displayed in Spotify extension?

- Web extensions are small software programs that customize the browsing experience. Therefore only basic information is displayed .
- Song title & artist name are the basis of any song.

As a result, I decided to display the song title, artist name, and their links.

## But, how does it look ?

The UI of Spotify extension is inspired by built-in “control your music, videos & more” feature of Chrome browser.

**Note:** Chrome browser has a built-in extension that allows controlling any media playing in the browser.

**Here is UI of built-in**

<div style="text-align: center;">
  <img width="403" title="built-in add on" alt="built-in add on" src="https://user-images.githubusercontent.com/6290720/90327749-d6048200-dfd1-11ea-9db6-43a3fef22cca.png">
</div>

**Spotify extension UI has 3 cases**

_User is not logged in_

<div style="text-align: center;">
  <img width="403" title="not logged in" alt="not-logged-in" src="https://user-images.githubusercontent.com/6290720/90327796-4f9c7000-dfd2-11ea-96af-5a4c2b0073cf.png">
</div>

_Spotify desktop app or web player is not opened_

<div style="text-align: center;">
  <img width="403" title="not opened" alt="not-opened" src="https://user-images.githubusercontent.com/6290720/90327854-a73adb80-dfd2-11ea-872a-f92a79961436.png">

</div>

_Happy case_

<div style="text-align: center;">
  <img width="409" title="Once there were dragons" alt="once-there-were-dragons" src="https://user-images.githubusercontent.com/6290720/90327876-c0dc2300-dfd2-11ea-9d47-d04a7fae4fdb.png">
</div>

<div style="text-align: center;">
  <img width="411" title="There are the times" alt="there-are-the-times" src="https://user-images.githubusercontent.com/6290720/90327872-bde13280-dfd2-11ea-83fa-b78360a4ae65.png">
</div>

<div style="text-align: center;">
  <img width="408" title="Pneuma" alt="pneuma" src="https://user-images.githubusercontent.com/6290720/90327912-039dfb00-dfd3-11ea-93ef-92a016908dea.png">
</div>

# Logo

The logo is very important for any product or business, it helps other people to recognize you. At first, I tried to design one by myself but could not come up with a good design so I asked my friend who is a designer to help. Here is what he came up with:

<div style="text-align: center;">
  <img title="spotify-mini-player" alt="spotify-mini-player" src="https://user-images.githubusercontent.com/6290720/90327943-54155880-dfd3-11ea-8ae9-e35c92feb858.png">
</div>

# Spotify Web API

To control the state of the Spotify application via web extension, I need a way to tell the Spotify application that I want to update state, e.g from playing to pause the song. Fortunately, Spotify provides the Web API endpoints to control the state of the application.

> https://developer.spotify.com/documentation/web-api/reference/

# Tech stack

At first, I used JS, HTML & CSS to set up a simple development. Because I thought that creating the Spotify Player extension would be as simple as building a UI and integrating with the API. It turned out to be more than that. During development I encountered edge cases that forced me to refactor the code. Refactoring code has never been an easy task, especially for JS which does not have strong type support and I think it’s not good in the long run. So I decided to rewrite the whole code base using a new stack and put a lot of effort into development set up. Here is what I used:

- Webpack
- Typescript (compile to JS)
- HTML
- Jest
- Travis for CI

## Why not use a library or framework?

Because libraries and frameworks are for larger scale projects and the JS file size is usually pretty big especially for plugins. So I decided to stick with Typescript with DOM rendering and manage application state on my own. You can check the details here:

> https://github.com/davidnguyen179/spotify-extension

# Edge cases

After integrating the API with the UI, the extension works pretty well. However, there are some edge cases which took me some time to fix.

- What happens if you leave the Spotify related app (desktop app or web player) idle for sometime (without playing any song) and you use Spotify Player extension to play a song?
- What happens if you suddenly turn off the Spotify app and you open the Spotify Player extension, how does the UI look?
- What if your token expired or you’re not logged in? How does the UI look?
- What if you don’t open any Spotify related app on your PC? Then, how does the UI of Spotify Player extension look?

To bring the best UX possible for users, I had to think about all possible cases and fix them all. Whenever I fixed things, I had to update my test suite in code to make sure future fixes or features won’t break the extension.

# Cross Browser support

<div style="text-align: center;">
  <img title="browser stats" alt="browser-stats" src="https://user-images.githubusercontent.com/6290720/90328091-b91d7e00-dfd4-11ea-8372-f71fd209e1eb.png">
</div>

My initial goal was only to create a Chrome extension. Then I realized web extensions are a standard for most browsers. They are all developed using JS, CSS, HTML and manifest file to manage configuration and permission of extension. Knowing this, I decided to support 3 browsers:

- Chrome
- Firefox
- Microsoft Edge (Chromium)

## Solution 1 — poly repo

Create 2 more repositories and develop for Firefox & Edge. This solution will work, but there are some downsides:

- What if you decided to add more functionality to the extension? Then you have to do it 3 times in 3 different repos.
- What if you have bugs? Then you have to fix it 3 times.
- How do you release it? You have to assure that 3 repos have the same version number and repeat the same process of publishing 3 times.

Well, switching contexts (switching repo to another repo) multiple times and doing many things can make you feel confused and tired. And with this approach, we violate the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) design principle. Because the logic and functionality is the same.

## Solution 2 — mono repo

With this approach, I keep one source code only and analyze what are differences between Chrome, Firefox, and Microsoft Edge. Here are the differences:

- manifest.json
- background.ts

**How can we make those files dynamic and correspond to each browser?**

This can be done at build-time. That means I will have 3 build scripts for each browser.

![build process](https://user-images.githubusercontent.com/6290720/90328259-ecacd800-dfd5-11ea-8f24-b03aa5dca847.png)

With this approach, I can only solve the first 2 problems that are listed above. But the core logic is shared between each browser.

# Testing

My first purpose is to build this extension to solve my own problem. But things are getting serious, I want to publish it to the web stores, that means Spotify Player Extension will have its own users. So it’s better to make sure the extension has no bugs and works smoothly.

After completing the development, I asked friends who are willing to try it out, but I have to write down detailed documentation on how to install this extension with developer mode in the browser. I tried to gather feedback, bug reports, and filter which ones should be fixed. After fixing those issues, I also updated my test suites to make sure those issues will not happen again.

My lesson is if you ask people to test it for you, you need to make sure that everything is super simple for them to test and you only have 2 – 3 chances to ask them to do it again, because they have jobs to do. Otherwise, it becomes annoying for them.

# Publishing

Here are the resources for publishing the extension to web stores

- [Chrome](https://developer.chrome.com/webstore/publish)
- [Firefox](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)
- [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension)

While publishing the web extension, I faced some issues which prevented me from publishing. Specifically, they will send an email to inform you if you have violated some rules.

**Chrome**

The email is sent by Google support team is done by bot and it is hard to understand because it contains many rules. Here is a resource I found really useful

- If you have a problem, you can post it in the google group and provide them your extension ID. https://groups.google.com/a/chromium.org/forum/#!forum/chromium-extensions

- [Jack and Amy Dev youtube channel](https://www.youtube.com/channel/UCVj3dGw75v8aHFYD6CL1tFg), which explains some common mistakes when we develop Chrome extension.

**Microsoft Edge**

They will require file “PRIVACY POLICY”. Make sure you have it.

**Firefox**

They might require you to upload your source code if your source code is minified.

# Marketing

The “Spotify Player Extension” has been published in 3 web stores. To let everyone know it exists, I used social media:

- Reddit
- Facebook
- Twitter

After I posted it I thought my work was done. However, I received a bunch of feedback from “Reddit”. They suggested a lot of improvements. Here we go again, I have to filter which ones I should implement, which ones are not going to add to a better UX, and just keep fixing and improving until it is stable.

# Conclusion

Here is how it looks like

<div style="text-align: center;">
  <img title="final look" alt="final look" src="https://user-images.githubusercontent.com/6290720/90328322-7ceb1d00-dfd6-11ea-8c31-8a47524c29fe.gif">
</div>

And here is the number of users of Chrome & Firefox browsers:

[![Chrome Extension Users](https://img.shields.io/chrome-web-store/users/bhdjjppbnlpjpeicimhemencfgjeldoa?color=0099ff&label=chrome%20users&logo=google-chrome&logoColor=d2ccd2)](https://chrome.google.com/webstore/detail/spotify-player/bhdjjppbnlpjpeicimhemencfgjeldoa) [![Chrome Extension Version](https://img.shields.io/chrome-web-store/v/bhdjjppbnlpjpeicimhemencfgjeldoa?color=0099ff&logo=google-chrome&logoColor=d2ccd2)](https://chrome.google.com/webstore/detail/spotify-player/bhdjjppbnlpjpeicimhemencfgjeldoa)

[![Firefox Add-On Users](https://img.shields.io/amo/users/spotify-player?color=FF9500&label=mozilla%20users&logo=firefox)](https://addons.mozilla.org/en-US/firefox/addon/spotify-player/) [![Firefox Add-On Version](https://img.shields.io/amo/v/spotify-player?color=FF9500&logo=firefox)](https://addons.mozilla.org/en-US/firefox/addon/spotify-player/)

The Spotify Player extension is available on 3 web stores:

**Chrome**

> https://chrome.google.com/webstore/detail/spotify-player/bhdjjppbnlpjpeicimhemencfgjeldoa

**Microsoft Edge**

> https://microsoftedge.microsoft.com/addons/detail/spotify-player/odplfjpibjdajlmaocmfmlcdidldlmnk

**Firefox**

> https://addons.mozilla.org/en-US/firefox/addon/spotify-player/

**Source code**

> https://github.com/davidnguyen179/spotify-extension

I really appreciate the community that helps me to improve this extension and friends who help me to test it out.
