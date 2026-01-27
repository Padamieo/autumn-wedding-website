'use server'

import { AuthEmailTemplate } from '../components/emails/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

type AuthEmail = { email:string; privateLink: string; firstName?: string };

export default async ({ email, privateLink, firstName }: AuthEmail ) => {
    let result = null;
    if (!privateLink) {
        return { result, error: 'No Link Provided' };
    }

    const { data, error } = await resend.emails.send({
        from: 'Adam <noreply@email.finallygettingmarried.nl>',
        to: [email],
        subject: 'Hello world',
        react: AuthEmailTemplate({ privateLink, firstName }),
    });

    return { result: data, error }
};