import dotenv from 'dotenv'
dotenv.config()

export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
export const POSTGRES_HOST = process.env.POSTGRES_HOST

console.log(POSTGRES_PASSWORD)
