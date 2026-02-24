import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import "@/styles/globals.css";
import { setCredentials } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { Toaster } from "react-hot-toast";


function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setCredentials({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppInitializer>
        <Layout>
          <Component {...pageProps} />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: 'white',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'white',
                },
              },
            }}
          />
        </Layout>
      </AppInitializer>
    </Provider>
  );
}
