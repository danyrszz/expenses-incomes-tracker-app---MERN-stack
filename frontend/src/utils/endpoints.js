const domain = 'http://localhost:3000'

export const endpoints = {
  assets : () => `${domain}/assets`,
  bills :
  { 
    betweenDates : (startingDate, endingDate) => `${domain}/bills/betweendates/${startingDate}/${endingDate}`,
    bill : (id) => `${domain}/bills/${id}`,
    add : () => `${domain}/bills`
  },
}