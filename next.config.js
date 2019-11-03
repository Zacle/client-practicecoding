const { PHASE_PRODUCTION_SERVER } =
      process.env.NODE_ENV === 'development'
      ? {}
      : !process.env.NOW_REGION
      ? require('next/constants')
      : require('next-server/constants');

// Fixes npm packages that depend on `fs` module
const nextConfig = { webpack: config => ({ ...config, node: { fs: 'empty' } }) }

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withCSS = require('@zeit/next-css')
    const withImages = require('next-images');
    return withImages(withCSS(nextConfig))
  }
  return nextConfig
}
