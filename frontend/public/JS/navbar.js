async function loadNavbar() {
    const container = document.getElementById("navbar");
    //se la nav non c'è chiudi -->guard clause
    if (!container) return;

    // 1. Inserisce l'HTML della navbar -->caricamento dom
    const html = await (await fetch("/api/v1/components/navbar.html")).text();
    container.innerHTML = html;

    // 2. Chiede al backend chi è loggato
    const authArea = document.getElementById("auth-area");
    const userBadge = document.getElementById("user-badge");
    try {
        const response = await fetch("/api/v1/auth/me");//endpoint standard google

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const user = await response.json();

        if (user.authenticated) {
            if (authArea) authArea.replaceChildren(); //quando autenticato toglie il contenuto "Login with google"
            console.log("Utente autenticato:", user.firstName);

            if (userBadge) {
                userBadge.replaceChildren();
                const hello = document.createElement("span");
                hello.className = "nav-welcome";
                hello.textContent = `Ciao ${user.firstName}`;

                const logout = document.createElement("a");
                logout.href = "/api/v1/auth/logout";
                logout.textContent = "Logout";
                logout.className = "logout-link";

                userBadge.append(hello, logout);
            }
        }
        // se non autenticato resta il link "Login With Google" già presente
    } catch (err) {
        // auth-service giù: la navbar resta in stato "non loggato"
        console.error("Impossibile verificare l'autenticazione:", err);
    }
}

window.addEventListener("DOMContentLoaded", loadNavbar);