import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { NotificationContextProvier } from './NotificationContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvier>
        <App />
      </NotificationContextProvier>
    </UserContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
)
