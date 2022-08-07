import './App.css';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import { Route, Routes } from 'react-router-dom';
import DetailsView from './views/DetailsView';
import NotFoundView from './views/NotFoundView';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const themeOptions = createTheme({
    palette: {
      primary: {
        main: '#263238',
      },
      secondary: {
        main: '#ef6c00',
      },
    },
  });

  return (
    <ThemeProvider theme={themeOptions} >
      <NavBar />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/games' element={<ProductsView />} />
        <Route path='/games/:game_id' element={<DetailsView />} />
        <Route path='*' element={<NotFoundView />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
