interface EmailTemplateProps {
  privateLink: string;
  emailContent: EmailContent;
}

export const authEmailArray = [
  'title',
  'dear',
  'please',
  'link',
  'signoff'
];

export type EmailContent = {
  title: string;
  dear: string;
  please: string;
  link: string;
  signoff: string;
}

export function AuthEmailTemplate({ privateLink, emailContent }: EmailTemplateProps) {
  
  return (
    <div>
      <h1>{emailContent.title}</h1>
      <h3>{emailContent.dear}</h3>
      <p>{emailContent.please}</p>
      <p><a href={privateLink} target="_blank" >{emailContent.link}</a></p>
      <p>{emailContent.signoff}</p>
    </div>
  );
}