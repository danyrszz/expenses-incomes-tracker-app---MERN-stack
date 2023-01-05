const domain = 'http://localhost:3000'

export const endpoints = {
  assets : () => `${domain}/assets`,
  bills : (startingDate, endingDate) => `${domain}/bills/betweendates/${startingDate}/${endingDate}`,
}