import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(
	// <StrictMode>
	//     <App />
	// </StrictMode>

  <App />,

);
