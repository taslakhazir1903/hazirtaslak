
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: 40 }}>
      <h1>Hazırtaslak Test Sürümü</h1>
      <p>Bu yapı Vercel deploy testinden geçti.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
