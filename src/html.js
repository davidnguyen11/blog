import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} className="light">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = 'light';
                function setTheme(newTheme) {
                  theme = newTheme;
                  document.body.className = newTheme;
                }

                try {
                  theme = window.localStorage.getItem('theme');
                  setTheme(theme);
                } catch (error) {}

                if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  darkQuery.addListener(function(e) {
                    var newTheme = e.matches ? 'dark' : 'light';
                    setTheme(newTheme);
                  });
                }
              })();
            `
          }}
        />
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
