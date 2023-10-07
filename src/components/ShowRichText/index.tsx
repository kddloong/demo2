import { FC } from 'react';

interface ShowRichTextProps {
  text: string;
}

export const ShowRichText: FC<ShowRichTextProps> = (props) => {
  const { text } = props;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  );
};
