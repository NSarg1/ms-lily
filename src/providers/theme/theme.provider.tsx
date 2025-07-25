import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { merge } from 'lodash';

import { commonConfig, darkAntConfig, lightAntConfig } from './theme.config';
import { ThemeContext } from './theme.context';
import { THEME_KEY, ThemeMode, ThemeProviderProps } from './theme.types';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const getInitialTheme = (): ThemeMode => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const antdThemeConfig = useMemo(
    () => (theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm),
    [theme],
  );

  const antdThemeConfigured = merge(theme === 'dark' ? darkAntConfig : lightAntConfig, commonConfig);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider
        theme={{
          cssVar: true,
          algorithm: antdThemeConfig,
          ...antdThemeConfigured,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
