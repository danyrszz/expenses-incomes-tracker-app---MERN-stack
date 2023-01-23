import { useEffect, useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { fetchData } from "../../utils/fetch";

export default function useGetAssets(){

  const [data, setData] = useState({loading:true})
  const url = endpoints.assets()
  
  useEffect(()=>{
    fetchData(url,'get')
    .then(res=>{
      if(res.length<1){
        setData({
          error: "error",
          loading: true
        })
      }else{
        setData({
          name: res[0].name,
          cost: res[0].assetCost,
          type: res[0].type,
          date: res[0].purchaseDate,
          incomes: res[0].totalIncomes,
          earnings: res[0].realEarnings,
          progress: res[0].investmentRecoveryProgress,
          loading: false
        })
      }
    })
  },[])

  return [data]
}