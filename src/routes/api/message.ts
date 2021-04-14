import nodemailer from 'nodemailer';
import type { RequestHandler } from '@sveltejs/kit';

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
 * @returns contact request email template as a html string
 */
function contactRequestTemplate(data: ContactForm) {
  return `${data.name} &lt;<a href="mailto:${data.email}">${data.email}<a>&gt;<br><br>${data.message}`
}

/**
 * Send an email to config.recipient through the sendgrid SMTP relay
 */
export const post: RequestHandler = ({ body }) => {
  const data = JSON.parse(body as string) as ContactForm;
  return client.sendMail({
    from: config.recipient,
    to: config.recipient,
    subject: 'Contact request: ' + data.name,
    html: contactRequestTemplate(data)
  }).then(body => {
    
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    }
  }, body => ({
    status: 500,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    body: body.toString()
  }))
  
}