import { useTranslations } from "next-intl";

interface EmailTemplateProps {
  firstName?: string;
  privateLink: string;
}

export function AuthEmailTemplate({ firstName, privateLink }: EmailTemplateProps) {
  const t = useTranslations();
  return (
    <div>
      <h1>Login magic link</h1>
      <h3>{firstName ? `Dear ${firstName},` : 'Hello,'}</h3>
      <p>Please use the link below to login to our site.</p>
      <p><a href={privateLink} target="_blank" >Sign in to finallygettingmarried.nl</a></p>
      <p>{t('email.signoff')}</p>
    </div>
  );
}