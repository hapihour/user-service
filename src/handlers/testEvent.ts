export const handler = (event, context, callback) => {
  const response =  {
    body: JSON.stringify(event)
  }

  callback(null, response)
}
