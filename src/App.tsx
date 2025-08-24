import { BrowserRouter } from 'react-router-dom';
import '../src/Styles/index.css'
import { AppRoutes } from './Routes/AppRoutes';
import { DiaryProvider } from './Context/DiaryContext';


function App() {

  return (
    <> 
    <BrowserRouter>
      <DiaryProvider>
      <AppRoutes />
      </DiaryProvider>
    </BrowserRouter>
    </>
  )
}

export default App
