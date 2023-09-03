import { useMemo } from 'react';
import { theme } from 'antd';

function useThemeStyle() {
  const { token } = theme.useToken();

  const themeStyle = useMemo(() => ({
    backgroundColor: token.colorPrimaryBg,
    padding: token.padding,
    color: token.colorPrimaryText,
    fontSize: token.fontSize,
  }), [
    token.colorPrimaryBg,
    token.colorPrimaryText,
    token.fontSize,
    token.padding
  ]);

  return {
    token,
    themeStyle
  };
}

export default useThemeStyle;
