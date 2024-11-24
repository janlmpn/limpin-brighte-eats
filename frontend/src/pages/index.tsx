import React from "react";
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
/** importing our pages */
import Registration from './Registration';
import ThankYou from './ThankYou';
import Leads from './Leads';

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </Router>
  );
}
