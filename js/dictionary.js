document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const meaningsSection = document.getElementById("meanings");

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query !== "") {
                fetchDictionaryMeanings(query);
            }
        }
    });

    function fetchDictionaryMeanings(query) {
        const apiKey = "YOUR_API_KEY"; // Replace with your Free Dictionary API key
        const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => { 
                displayMeanings(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    function displayMeanings(data) {
        meaningsSection.innerHTML = "";

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(meaning => {
                const definition = meaning.shortdef && meaning.shortdef.length > 0 ? meaning.shortdef[0] : "No definition found";
                const meaningElement = document.createElement("p");
                meaningElement.textContent = definition;
                meaningsSection.appendChild(meaningElement);
            });
        } else {
            const noResultsMessage = document.createElement("p");
            noResultsMessage.textContent = "No meanings found for this word.";
            meaningsSection.appendChild(noResultsMessage);
        }
    }
});
