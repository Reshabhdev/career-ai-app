import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Landing from './Landing';
import MainApp from './MainApp';
import Roadmap from './Roadmap';
import Documentation from './Documentation';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import ScrollToTop from './ScrollToTop';
import AboutUs from './AboutUs';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
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