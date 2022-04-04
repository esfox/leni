import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        WindiCSS(),
      ],
      resolve: {
        alias: {
          src: path.resolve('src'),
        }
      }
    }
  }
};

export default config;
