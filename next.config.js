// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')
// const nextEnv = require('next-env')
// const dotenvLoad = require('dotenv-load')
// const withPlugins = require('next-compose-plugins')

// dotenvLoad()

const dotEnvResult = require('dotenv').config()

if (dotEnvResult.error) {
  throw dotEnvResult.error
}

const parsedVariables = dotEnvResult.parsed || {}
const dotEnvVariables = {}
// We always want to use the values from process.env, since dotenv
// has already resolved these correctly in case of overrides
for (const key of Object.keys(parsedVariables)) {
  dotEnvVariables[key] = process.env[key]
}

const nextConfig = {
  env: {
    ...dotEnvVariables,
  },
  target: 'serverless',
	workboxOpts: {
		swDest: 'public/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /[.](png|jpg|ico|css)/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'assets-cache',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^http.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'http-cache'
				}
			}
		]
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
      ]
    },
  },
}

module.exports = withOffline(nextConfig)
// module.exports = withPlugins([nextEnv(),], nextConfig)
