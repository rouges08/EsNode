async function loadWelcomeGif() {
  try {
    const response = await fetch("/api/v1/auth/me");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    console.log("Risposta API auth:", user);

    if (!user || user.authenticated === false) {
      return;
    }

    const welcomeContent = document.getElementById("welcome-content");

    if (!welcomeContent) {
      return;
    }

    const panel = document.createElement("div");
    panel.className = "welcome-panel";

    const box = document.createElement("div");
    box.className = "welcome-box";

    const img = document.createElement("img");
    img.src = "https://media1.tenor.com/m/qF8LaERf5hoAAAAd/mussolini.gif";
    img.alt = "Welcome Gif";

    const jsonButton = document.createElement("button");
    jsonButton.type = "button";
    jsonButton.className = "json-button";
    jsonButton.textContent = "Mostra JSON";

    const jsonOutput = document.createElement("div");
    jsonOutput.id = "user-json";
    jsonOutput.className = "json-output";
    jsonOutput.hidden = true;

    const jsonImage = document.createElement("img");
    jsonImage.alt = "Immagine dal JSON";
    jsonImage.className = "json-image";
    jsonImage.style.display = "none";

    jsonOutput.appendChild(jsonImage);

    jsonButton.addEventListener("click", async () => {
      try {
        const jsonResponse = await fetch("/api/v1/json-server/user.json");

        if (!jsonResponse.ok) {
          throw new Error(`HTTP error: ${jsonResponse.status}`);
        }

        const jsonData = await jsonResponse.json();
        jsonImage.src = jsonData.image;
        jsonImage.style.display = "block";
        jsonOutput.hidden = false;
      } catch (error) {
        console.error("Errore nel recupero del JSON dal backend:", error);
      }
    });

    box.appendChild(img);
    panel.appendChild(box);
    panel.appendChild(jsonButton);
    panel.appendChild(jsonOutput);
    welcomeContent.appendChild(panel);
  } catch (err) {
    console.error("Errore durante il caricamento della GIF:", err);
  }
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", loadWelcomeGif);
} else {
  loadWelcomeGif();
}

