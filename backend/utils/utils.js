const responseObject = (error, ok, message)=> {
  return {
    error : error,
    message : message,
    ok : ok
  }
}

module.exports = responseObject