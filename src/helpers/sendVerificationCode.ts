import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER

/**
 * Verification code helper
 * @func sendCode
 *
 * @param {string}   phoneNumber
 *
 * @param {code}   number
 *
 * @return {Object}
 */

const sendCode = (phoneNumber: string, code: number)=>{
  const client = twilio(accountSid, authToken);
  const number = phoneNumber.replace('0', '+256');

  return client.messages.create({
    body: `VERIFICATION CODE ${code}`,
    from: twilioNumber,
    to: number
  })
}

export default sendCode
