const {
  PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD
} = require('next/constants')

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
