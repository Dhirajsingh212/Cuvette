import twilio from "twilio";

const accountSid = process.env.TWILLIO_API_KEY;
const authToken = process.env.TWILLIO_AUTH_TOKEN;

export const client = twilio(accountSid, authToken);
