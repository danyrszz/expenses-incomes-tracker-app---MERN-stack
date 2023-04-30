import { useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { fetchData } from "../../utils/fetch";

export default function useDeleteSpend (){

  const [isDeleted, setIsDeleted] = useState(false)

  async function deleteSpend(id){
    setIsDeleted(true)
    const result = await fetchData (endpoints.spends.spend(id), 'delete')
    result.ok ? setIsDeleted(true) : setIsDeleted(false)
  }

  return {deleteSpend, isDeleted,}
}