export async function fetchData (url, method, authToken) {
  try{
    const data = await fetch( url, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth' : authToken
        }, 
      method:method
    })
    const res = await data.json()
    return res
  }catch(e){
    return []
  }
}

export async function saveData (url,method, body) { 
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