// App root — compose all sections.

function App() {
  return (
    <main>
      <Hero />
      <Tension />
      <Mechanism />
      <WhyEmoji />
      <WhatChanges />
      <AgeGroups />
      <FounderNote />
      <ForWhom />
      <FinalCTA />
      <Footer />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
