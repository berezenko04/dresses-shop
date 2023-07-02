import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

//app
import App from './App'

//redux
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename='/Sandrela'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
