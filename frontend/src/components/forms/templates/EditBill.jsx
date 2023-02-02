import ModalContainer from "../../Snacks/ModalContainer"
import AddBill from "../../../pages/AddBill/AddBill"

export default function EditBill(){

  return (
    <ModalContainer visible={true}>
      <AddBill></AddBill>
    </ModalContainer>
  )
}