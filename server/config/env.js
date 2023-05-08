import * as dotenv from 'dotenv'

dotenv.config()

const missing = ['PORT', 'DB_URL', 'URL_FRONTEND'].filter(
  (env) => process.env[env] == null,
)

if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(', ')}.`)
}

const PORT = process.env.PORT ?? '4000'
const DB_URL = process.env.DB_URL ?? ''
const URL_FRONTEND = process.env.URL_FRONTEND ?? ''

export { PORT, DB_URL, URL_FRONTEND }
