import './App.css'
import HeaderBar from './components/HeaderBar'
import Asset from './pages/Assets/Asset'
import Error from './components/error/Error'
import AddSpend from './pages/AddSpend'
import Bills from './pages/Bills/Bills'

function App() {


  return (
    <div className="App">
      <HeaderBar/>

      <Error>
        <Asset></Asset>
      </Error>

      {/* <AddSpend></AddSpend> */}
    
      {/* <Bills></Bills> */}
      
    </div>
  )
}


export default App
