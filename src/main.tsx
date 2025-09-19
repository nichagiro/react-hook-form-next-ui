import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './page/App.tsx'
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
)



