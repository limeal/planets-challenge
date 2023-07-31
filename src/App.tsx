import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Planet from './components/Planet'

function App() {

  const [currentPlanet, setCurrentPlanet] = useState('Mercury')

  return (
    <>
      <Header setCurrentPlanet={setCurrentPlanet} />
      <main>
        <Planet name={currentPlanet} />
      </main>
      <footer>

      </footer>
    </>
  )
}

export default App
