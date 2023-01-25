import './App.css'
import HeaderBar from './components/HeaderBar'
import Asset from './pages/Assets/Asset'
import Error from './components/error/Error'
import Bills from './pages/Bills/Bills'
import AddBill from './pages/AddBill/AddBill'

function App() {


  return (
    <div className="App">
      <HeaderBar/>

      {/* <Error>
        <Asset></Asset>
      </Error> */}

      {/* <AddSpend></AddSpend> */}
    
      {/* <Bills></Bills> */}

      <AddBill></AddBill>
      
    </div>
  )
}


export default App
