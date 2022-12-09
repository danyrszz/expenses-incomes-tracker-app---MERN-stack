import './App.css'
import HeaderBar from './components/HeaderBar'
import AssetCard from './components/Asset/AssetCard'

function App() {
  return (
    <div className="App">
      <HeaderBar/>
      <div className="content">
        <AssetCard>
          <p>Chevrolet Matiz 2015</p>
          <div className="details">
            
          </div>
        </AssetCard>
      </div>
    </div>
  )
}


export default App
