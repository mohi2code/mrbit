import { theme } from 'antd';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function FullPage({ children, padding, ...props }) {
  const { token } = theme.useToken();

  // set body element background color
  useEffect(() => {
    document.documentElement.style.setProperty('--bodyColor', token.colorBgBase);
  }, [token?.colorBgBase]);

  return <div style={{
    backgroundColor: token.colorBgBase,
    padding: padding ? padding : token.padding,
    color: token.colorPrimaryText,
    fontSize: token.fontSize,
    height: '100vh',
  }} {...props}>{children}</div>;
}

export default FullPage;