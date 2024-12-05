'use client'
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const msg = {
      to: email,
      from: 'noreply@yourdomain.com', // Replace with your verified sender email
      subject: 'Your Account Information',
      text: `Your account has been created. Your username is ${email} and your password is ${password}.`,
      html: `<strong>Your account has been created. Your username is ${email} and your password is ${password}.</strong>`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
