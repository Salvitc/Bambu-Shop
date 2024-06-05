export const sendMail = async (message) => {
  const result = await fetch("api/mail", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message),
  });

  return result
}

