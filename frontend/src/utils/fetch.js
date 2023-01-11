export async function fetchData (url, method) {
    try{
      const data = await fetch( url, {method:method} )
      const res = await data.json()
      return res
    }catch(e){
      console.log(e)
      return []
    }
  }