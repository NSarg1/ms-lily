import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App/App.tsx';
import { ThemeProvider } from './providers/theme/theme.provider.tsx';

import './configs/axios.config';
import 'modern-normalize/modern-normalize.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
