
import Dashboard from "./pages/Dashboard";
import DashboardHeader from "./components/DashboardHeader";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">S</span>
          <span>Sensor Monitor</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-heading">WORKSPACE</p>

          <a className="nav-link active" href="#dashboard">
            <span>▦</span>
            Dashboard
          </a>

          <a className="nav-link" href="#insights">
            <span>▥</span>
            Insights
          </a>

          <a className="nav-link" href="#devices">
            <span>◉</span>
            Devices
          </a>

          <a className="nav-link" href="#events">
            <span>◷</span>
            Events
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-icon">●</span>
          Sensor monitoring system
          <span className="version-label">Version 1.0</span>
        </div>
      </aside>

      <main className="main-area">
        <DashboardHeader
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <Dashboard />
      </main>
    </div>
  );
}

export default App;



// import { useEffect, useState } from "react";
// import { getLatestReading } from "./services/sensorApi";
// import type { SensorReading } from "./types/sensor";

// function App() {
//   const [reading, setReading] = useState<SensorReading | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getLatestReading()
//       .then(setReading)
//       .catch((err: Error) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <main style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h1>Sensor API Connection Test</h1>

//       {loading && <p>Connecting to sensor API...</p>}

//       {error && (
//         <p style={{ color: "red" }}>
//           Connection failed: {error}
//         </p>
//       )}

//       {reading && (
//         <section>
//           <h2>Latest reading</h2>
//           <p>Sensor: {reading.sensor_id}</p>
//           <p>Temperature: {reading.temperature_c} °C</p>
//           <p>Humidity: {reading.humidity_pct} %</p>
//           <p>Battery: {reading.battery_pct} %</p>
//           <p>Measured at: {new Date(reading.measured_at).toLocaleString()}</p>
//         </section>
//       )}
//     </main>
//   );
// }

// export default App;



// // import { useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App
