import { endpoints } from "../../utils/endpoints"
import { fetchData } from "../../utils/fetch"

export async function loader({params}){
  const res = await fetchData(endpoints.spends.spend(params.id),'GET')
  const spend = {
    id : res._id,
    payed : res.payed,
    date : res.date,
    name : res.name,
    description : res.description,
    category : res.category,
    amount : res.amount,
  }
  return {spend}
}