const form = document.getElementById("telegramForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const TOKEN = "8715834935:AAE1aE6JfiDaSYZJ5iPtNTT8f98E58Skvcg";
  const CHAT_ID = "-5183115862";

  const message = `
📩 New message from site

👤 Name: ${name}
📧 Email: ${email}
`;

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (response.ok) {
      statusText.textContent = "Message sent!";
      form.reset();
    } else {
      statusText.textContent = "Error!";
    }
  } catch (error) {
    statusText.textContent = "Connection error!";
  }
});