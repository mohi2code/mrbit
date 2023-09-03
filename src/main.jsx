import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './app/services/firebase';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ConfigProvider, theme } from 'antd';
import App from './App.jsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
