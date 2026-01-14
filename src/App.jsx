import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import store from './pages/store';
import { Provider } from 'react-redux'
import RootLayout from './pages/rootLayout'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryInstance = new QueryClient();
function App() {
  const router = createHashRouter([
    {
      path: '/',
      id: 'RootLayout',
      Component: RootLayout,
      children: [
        {
          path: '/Pricing',
          id: 'Pricing',
          lazy: async () => {
            const component = await import('./pages/pricing');
            return { Component: component.default, data: [] }
          },
          errorElement: <>Not Found</>,
        },
        {
          path: '/Subscription',
          id: 'Subscription',
          lazy: async () => {
            const component = await import('./pages/subscription');
            return { Component: component.default, data: [] }
          },
          errorElement: <>Not Found</>
        },
        {
          path: '/Maintenance',
          id: 'Maintenance',
          lazy: async () => {
            const component = await import('./pages/maintenance');
            return { Component: component.default, data: [] }
          },
          errorElement: <>Not Found</>
        },
        {
          path: '/Executed',
          id: 'Executed',
          lazy: async () => {
            const component = await import('./pages/executed');
            return { Component: component.default, data: [] }
          },
          errorElement: <>Not Found</>
        },
        {
          path: '/Home',
          id: 'Home',
          lazy: async () => {
            const component = await import('./pages/home');
            return { Component: component.default, data: [] }
          },
          errorElement: <>Not Found</>
        }
      ]
    },
    {
      path: '*',
      element: <>Not Found</>
    }
  ])
  return (
    <QueryClientProvider client={queryInstance}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
