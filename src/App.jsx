import './index.css';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Stattistics from './pages/Stattistics';

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/statistics" element={<Stattistics />} />
      </Routes>
    </Router>
  );
}


//     "accessCode": "arzUcG",
//     "clientID": "37d7e0f0-2c86-438c-a0cb-4963f723306f",
//     "clientSecret": "aSGcaHxhqvFYAxUB"
  // "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmNkMzAwOEByZ2lwdC5hYy5pbiIsImV4cCI6MTc1ODQ0NjAwMywiaWF0IjoxNzU4NDQ1MTAzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjZlYjk4OWQtMDdkYy00MTNlLTlkYjItYTBlZTFmZDdlYzUxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXl1c2hpIHBhbCIsInN1YiI6IjM3ZDdlMGYwLTJjODYtNDM4Yy1hMGNiLTQ5NjNmNzIzMzA2ZiJ9LCJlbWFpbCI6IjIyY2QzMDA4QHJnaXB0LmFjLmluIiwibmFtZSI6ImF5dXNoaSBwYWwiLCJyb2xsTm8iOiIyMmNkMzAwOCIsImFjY2Vzc0NvZGUiOiJhcnpVY0ciLCJjbGllbnRJRCI6IjM3ZDdlMGYwLTJjODYtNDM4Yy1hMGNiLTQ5NjNmNzIzMzA2ZiIsImNsaWVudFNlY3JldCI6ImFTR2NhSHhocXZGWUF4VUIifQ.kC9zrRwEIdMIMMsGZ0-1VSVX9cb9m8P5gMN0eGdBSZI",

export default App;
