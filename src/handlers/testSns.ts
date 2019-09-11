export const handler = (event, context) => {
  const message = event.Records[0].Sns.Message;

  console.log(message);

  return message;
};
