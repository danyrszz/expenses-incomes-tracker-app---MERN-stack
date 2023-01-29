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

export async function saveData (url,method,body) { 
  const res = await fetch( url, 
    {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    method : method,
    body : JSON.stringify(body)
    })
  return res.json()
}