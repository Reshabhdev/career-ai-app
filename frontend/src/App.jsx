import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Landing from './Landing';
import MainApp from './MainApp';
import Roadmap from './Roadmap';
import AuthHeader from './components/AuthHeader';

export default function App() {
  return (
    <Router>
      <AuthHeader />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={
          <>
            <SignedIn>
              <MainApp />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
        <Route path="/roadmap" element={
          <>
            <SignedIn>
              <Roadmap />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
    </Router>
  );
}