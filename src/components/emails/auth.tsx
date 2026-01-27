interface EmailTemplateProps {
  firstName?: string;
  privateLink: string;
}

export function AuthEmailTemplate({ firstName, privateLink }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome</h1>
      <p>{firstName ? `Dear ${firstName}` : 'Hello,'}</p>
      <p><a href={privateLink} target="_blank" >Sign in to finallygettingmarried.nl</a></p>
    </div>
  );
}