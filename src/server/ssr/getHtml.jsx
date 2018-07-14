import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import App from '../../client/containers/App';

export default async (req, index, store) => {
  const sheet = new ServerStyleSheet();
  const context = {};

  const appMarkup = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StyleSheetManager>
  );
  const styleTags = sheet.getStyleTags();
  const storeState = JSON.stringify(store.getState());
  
  const html = index
    .replace('</head>', `${styleTags}</head>`)
    .replace('<div id="app"></div>', `
      <div id="app">${appMarkup}</div>
      <script>window.APP_STATE=${storeState}</script>
    `);
  
  return html;
};
