import useActiveModal from './useActiveModal';

export default function ModalContainer({children, visible}){

  useActiveModal(visible)

  return (
    <div className={`modal flex-centered ${visible?'modal-opened':'modal-closed'}`}>
      {children}
    </div>
  )
}