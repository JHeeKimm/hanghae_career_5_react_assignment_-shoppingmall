import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { useAuthListener } from './hooks/useAuthListener';
import Toast from './pages/common/components/Toast';

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const App = () => {
  useAuthListener();
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error('Failed to find the root element.');
}
