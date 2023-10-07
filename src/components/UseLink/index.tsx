import type { ReactChild, ReactFragment, ReactPortal } from 'react';

const UseLink = (props: {
  color?: string;
  onClick?: any;
  children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  noFlex?: boolean;
  hasUnderline?: boolean;
}) => {
  const { noFlex = false, color = '#0053d1', hasUnderline = false } = props;

  return (
    <a
      style={{
        color,
        display: noFlex ? 'initial' : 'flex',
        alignItems: 'center',
        textDecoration: hasUnderline ? 'underline' : 'initial',
      }}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
};

export { UseLink };
