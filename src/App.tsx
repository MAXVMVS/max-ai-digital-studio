import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemGrid from "./components/ProblemGrid";
import Methodology from "./components/Methodology";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import OnboardingForm from "./components/OnboardingForm";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div 
      id="max-ai-studio-app" 
      className={`bg-[#041021] text-[#F8FAFC] antialiased selection:bg-[#C17F4E]/30 selection:text-[#F8FAFC] min-h-screen relative overflow-x-hidden ${
        theme === "light" ? "light-theme" : ""
      }`}
    >
      {/* Absolute top fixed navbar with Theme Switcher support */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="relative flex flex-col w-full">
        {/* Hero Segment */}
        <Hero />

        {/* Client obstacles/Frictions Segment */}
        <ProblemGrid />

        {/* The 4-Pillars design methodology Segment */}
        <Methodology />

        {/* Case Studies Segment */}
        <Portfolio />

        {/* Pricing checklist & scopes Segment */}
        <Pricing />

        {/* Multi-step interactive diagnostic form with Real Firebase Connector */}
        <OnboardingForm />
      </main>

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
