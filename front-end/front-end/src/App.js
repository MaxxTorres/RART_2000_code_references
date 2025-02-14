import {Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SignPage from './pages/SignPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignPage />} />
        <Route path="register" element={<RegisterPage />} />  
      </Routes>
    </div>
  );
}

export default App;
