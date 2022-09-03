import {defineConfig} from "vite";
import path from 'path'

const config = {
    base: '',
    server: {
        host: '0.0.0.0',
        hmr: false,
    },
    build: {emptyOutDir: false}
};

export default defineConfig(({command, mode, ssrBuild}) => {
    let actAsReplit = false;
    let isReplit = process.env.REPL_OWNER || actAsReplit || '';
    process.env.VITE_IS_REPLIT = isReplit;
    if (isReplit && !actAsReplit) {
        config.server.port = 443;
    }

  config.build = {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index_original.html'),
      }
    }
  }

    return config;
})