import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.dev';
import getHtml from './ssr/getHtml';

import firebase from '../firebase/wrapper';
firebase.init();

const app = express();
const webpackCompiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
  stats: { assets: false, colors: true, version: false, hash: false, timings: false, chunks: false, chunkModules: false, 'errors-only': true }
}));

app.use(webpackHotMiddleware(webpackCompiler));

webpackCompiler.hooks.done.tap('CompileSuccessInfo', (stats) => {
  process.nextTick(() => {
    stats = stats.toJson();
    if (stats.errors && stats.errors.length > 0) {
      return;
    }
    
    console.log('\x1b[36m%s\x1b[0m \x1b[46m%s\x1b[0m', 'Listening at:', 'http://localhost:3000');
  });
});

app.get('*', async (req, res) => {
  const memoryFs = webpackCompiler.outputFileSystem;
  const filePath = path.join(webpackCompiler.outputPath, '_index.html');
  const index = memoryFs.readFileSync(filePath, 'utf8');
  const html = await getHtml(req, index);
  res.send(`<!doctype html>${html}`);
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info('Please wait for webpack...');	
});
