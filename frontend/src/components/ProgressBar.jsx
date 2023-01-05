import './styles/ProgressBar.css'
export default function ProgressBar({progress}){
  const roundProgress = Math.round(progress)
  console.log(roundProgress)
  return(
    <div className="progress-bar-wrapper flex-centered">
      <span>0</span>
      <progress className='progress-bar' value={roundProgress} max="100"></progress>
      <span>100</span>
    </div>
  )
}