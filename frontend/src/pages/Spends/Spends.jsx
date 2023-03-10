import useGetLastSpends from '../Home/useGetLastSpends'
import Table from './Table'
import DropDownItem from './DropDownItem'
import InformativeMessage from '../../components/InformativeMessage'
import SpendFilter from './SpendFilter'

export default function Spends () {
  const spendsShowed = 10
  const minWidth = 1050
  const width = window.innerWidth
  const spends = useGetLastSpends(spendsShowed)

  const dropdownItems = spends.lastSpends.map(e=> <DropDownItem key={e._id} dropdownHeight={150} data={e} />)

  return (
    <>
      <SpendFilter></SpendFilter>
      <InformativeMessage message={`Estás viendo los últimos ${spendsShowed} gastos.`}/>
      {width>minWidth ? <Table spends = {spends} /> : dropdownItems}
    </>
  )
}