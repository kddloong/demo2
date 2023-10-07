import type { FC } from 'react';

const ContentRender: FC<{ content: string }> = (props) => {
  return (
    <>
      <div
        style={{
          wordBreak: 'break-all',
          width: '100%',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {props.content}
      </div>
    </>
  );
};

export { ContentRender };
