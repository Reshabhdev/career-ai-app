import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import MainApp from './MainApp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}