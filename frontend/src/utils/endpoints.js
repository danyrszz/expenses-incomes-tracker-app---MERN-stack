
// const domain = import.meta.env.VITE_API_SERVICE
const domain = 'http://localhost:3000'

export const endpoints = {
  assets : () => `${domain}/assets`,
  bills :
  { 
    betweenDates : (startingDate, endingDate) => `${domain}/bills/betweendates/${startingDate}/${endingDate}`,
    bill : (id) => `${domain}/bills/${id}`,
    last: (limit) => `${domain}/bills/last/${limit}`,
    add : () => `${domain}/bills`
  },
  spends:{
    last: (limit) => `${domain}/spends/last/${limit}`,
    spend : (id) => `${domain}/spends/id/${id}`,
    add : () => `${domain}/spends`,
    filter : () => `${domain}/spends/filter`,
    search : () => `${domain}/spends/search`
  },
  login: ()=> `${domain}/login`,
  checkLogin : ()=> `${domain}/checkLogin`
}

export const categories = ['tramite', 'servicio', 'reparacion', 'refaccion']