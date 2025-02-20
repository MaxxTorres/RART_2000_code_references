import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SignPage from './pages/SignPage'
import ControlPage from './pages/ControlPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="register" element={<RegisterPage />} /> 
        <Route path="control" element={<ControlPage />} />
      </Routes>
    </div>
  );
}

export default App;
