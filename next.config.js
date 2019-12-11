// const fetch = require('isomorphic-unfetch');
const withOffline = require('next-offline')
// const nextEnv = require('next-env')
// const dotenvLoad = require('dotenv-load')
// const withPlugins = require('next-compose-plugins')
require('dotenv').config()

// dotenvLoad()

// const dotEnvResult = require('dotenv').config()

// if (dotEnvResult.error) {
//   throw dotEnvResult.error
// }

// const parsedVariables = dotEnvResult.parsed || {}
// const dotEnvVariables = {}
// for (const key of Object.keys(parsedVariables)) {
//   dotEnvVariables[key] = process.env[key]
// }

const nextConfig = {
  // env: {
    //   ...dotEnvVariables,
    // },
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
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
