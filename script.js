let bibliotheque = [];

document.addEventListener("DOMContentLoaded", () => {
    afficherLivres();
    document.getElementById("book-form").addEventListener("submit", ajouterLivre);
});

// Function to add a book
function ajouterLivre(event) {
    event.preventDefault(); 

    let titre = document.getElementById("titre").value.trim();
    let auteur = document.getElementById("auteur").value.trim();
    let annee = parseInt(document.getElementById("annee").value.trim(), 10);
    let lu = false; // Default status: Not Read

    if (titre && auteur && !isNaN(annee)) {
        bibliotheque.push({ titre, auteur, annee, lu });
        afficherLivres();
        document.getElementById("book-form").reset(); 
    } else {
        alert("Veuillez saisir des informations valides.");
    }
}

// Function to search for a book
function rechercherLivre() {
    let recherche = document.getElementById("search").value.toLowerCase();
    let resultats = bibliotheque.filter(livre =>
        livre.titre.toLowerCase().includes(recherche) ||
        livre.auteur.toLowerCase().includes(recherche)
    );
    afficherLivres(resultats);
}

// Function to delete a book
function supprimerLivre(index) {
    bibliotheque.splice(index, 1);
    afficherLivres();
}

// Function to toggle the read status
function statut(index) {
    bibliotheque[index].lu = !bibliotheque[index].lu; 
    afficherLivres(); 
}

// Function to sort books by year
function trierLivres() {
    bibliotheque.sort((a, b) => a.annee - b.annee); // Fixed variable name
    afficherLivres();
}

// Function to display books
function afficherLivres(livres = bibliotheque) {
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Année</th>
                    <th>Statut</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
    `;

    livres.forEach((livre, index) => {
        let statutText = livre.lu ? "✅ Lu" : "❌ Non Lu"; 
        let statutClass = livre.lu ? "read" : "not-read"; 

        tableHTML += `
            <tr>
                <td>${livre.titre}</td>
                <td>${livre.auteur}</td>
                <td>${livre.annee}</td>
                <td><button class="${statutClass}" onclick="statut(${index})">${statutText}</button></td>
                <td><button class="delete" onclick="supprimerLivre(${index})">🗑️</button></td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;
    document.getElementById("livres-list").innerHTML = tableHTML;
}
