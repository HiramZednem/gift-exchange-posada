import { config } from 'dotenv'

if(process.env.NODE_ENV !== 'production'){
  config();
}

export const senderEmail = process.env.SENDER_EMAIL
export const senderPassword = process.env.SENDER_PASSWORD