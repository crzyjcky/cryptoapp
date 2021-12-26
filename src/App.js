import React, { useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

function App({ isPassedToWithAuthenticator, signOut, user }) {
  const [coins, updateCoins] = useState([])

  async function fetchCoins() {
    const data = await API.get('cryptoapi', '/coins')
    updateCoins(data.coins)
  }

  useEffect(() => {
    fetchCoins()
  }, [])
  
  return (
    <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  )
  
  
  // if (!isPassedToWithAuthenticator) {
  //   throw new Error(`isPassedToWithAuthenticator was not provided`);
  // }

  // return (
  //   <div>
  //     <h1>Hello from AWS Amplify</h1>
  //     <h1>Hello {user.username}</h1>
  //     <button onClick={signOut}>Sign out</button>
  //   </div>
  // )
}

export default withAuthenticator(App)

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  }
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
