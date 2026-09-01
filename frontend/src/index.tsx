import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';
import { appRoutes } from './App';
import { RouterProvider } from 'react-router-dom';

let container = document.getElementById("app")!;
let root = createRoot(container)
root.render(
  <StrictMode>
    <RouterProvider router = {appRoutes}/>
  </StrictMode>
);

