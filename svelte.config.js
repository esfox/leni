import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({ out: 'build' }),
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
