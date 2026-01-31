'use server'

import { AuthEmailTemplate, EmailContent } from '../components/emails/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

type AuthEmail = { email:string; privateLink: string; emailContent: EmailContent };

export default async ({ email, privateLink, emailContent }: AuthEmail ) => {
    let result = null;
    if (!privateLink) {
        return { result, error: 'No Link Provided' };
    }

    const date = new Date().toUTCString();

    const { data, error } = await resend.emails.send({
        from: 'Adam <noreply@email.finallygettingmarried.nl>',
        to: [email],
        subject: `Log in request on ${date}`,
        react: AuthEmailTemplate({ privateLink, emailContent }),
    });

    return { result: data, error }
};