import './App.css'
import HeaderBar from './components/HeaderBar'
import AssetCard from './components/Asset/AssetCard'
import BillCard from './components/Bills/BillCard'

function App() {
  return (
    <div className="App">
      <HeaderBar/>
      <div className="content">
        {/* <AssetCard>
          <p>Chevrolet Matiz 2015</p>
          <div className="details">
            
          </div>
        </AssetCard> */}
        <BillCard
          amount = {1500}
          date = '2022-10-28T00:00:00.000+00:00'
        />
      </div>
    </div>
  )
}


export default App
