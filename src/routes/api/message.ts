import nodemailer from 'nodemailer';
import type { RequestHandler } from '@sveltejs/kit';
import { jsonResponse, textResponse } from '$lib/responses';
import type Mail from 'nodemailer/lib/mailer';

const client = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  auth: {
    user: "apikey",
    pass: process.env['SENDGRID_APIKEY']
  }
});

const config = {
  recipient: {
    name: process.env['RECIPIENT_NAME'],
    address: process.env['RECIPIENT_ADDRESS']
  }
}

export type ContactForm = {
  email: string,
  name: string,
  message: string
}

/**
 * Get the contact request email template
 * 
 * @param data Contact form data
 * @returns contact request email template
 */
function contactRequestTemplate(data: ContactForm): Mail.Options {
  return {
    from: config.recipient,
    to: config.recipient,
    subject: `Contact request: ${data.name}`,
    html: `${data.name} &lt;<a href="mailto:${data.email}">${data.email}<a>&gt;<br><br>${data.message}`
  }
}

/**
 * Send an email to config.recipient through the sendgrid SMTP relay
 */
export const post: RequestHandler = ({ body }) => {
  const data = JSON.parse(body as string) as ContactForm;
  const template = contactRequestTemplate(data);
  return client.sendMail(template).then(body => jsonResponse(200, body), body => textResponse(500, body));
}