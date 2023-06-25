import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from './pages/home/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieDetailsPage from './pages/movie_details/index.tsx'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { Notifications } from "@mantine/notifications"
import { MovieGenres } from './pages/movie_genres/index.tsx'
import { WelcomePage } from './pages/welcome/index.tsx'
import { LoginPage } from './pages/login/index.tsx'
import { SignupPage } from './pages/signup/index.tsx'
import ProtectedRoutes from './pages/protected.tsx'
import { RootLayout } from './pages/layout.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 * 7
    }
  }
})

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  colors: {
    purple: ["#F2EAFF", "#E0CFFF", "#BD9CFF", "#8C52FF", "#7937FE", "#6519FE", "#5C09FF", "#4C00E4", "#4300CC", "#3700B4"],
  },
  primaryColor: 'purple',
  primaryShade: 7,
  headings: {
    fontFamily: "Noto Sans"
  },
  fontFamily: "Nunito"
}

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/genres/:id",
            element: <MovieGenres />,
          },
        ]
      },
      {
        path: "/movie/:id",
        element: <MovieDetailsPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
