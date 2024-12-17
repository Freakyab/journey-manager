import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AllRouter from './allRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllRouter />
  </StrictMode>,
)
