import DropDownItem from "./DropDownItem"
export default function MobileView ({spends}){

  const dropdownItems = spends.map(e=> <DropDownItem key={e._id} data={e} />)

  return dropdownItems
}