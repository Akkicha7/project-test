// FLAW 1: Fatal Crash. Trying to attach to an ID that doesn't exist in HTML.
// Because the script is loaded in the <head> without 'defer', 'document' isn't fully ready anyway.
document.getElementById("submit-btn").addEventListener("click", searchUser);

function searchUser() {
    var query = document.getElementById("userInput").value;
    var display = document.getElementById("output");

    // FLAW 2: Severe XSS (Cross-Site Scripting) Vulnerability!
    // Directly injecting untrusted user input into the DOM as HTML.
    // An attacker could type: <img src="x" onerror="alert('Hacked!')">
    display.innerHTML = "<h2>Results for: " + query + "</h2>";

    // FLAW 3: Unhandled promise and bad error handling.
    fetch("https://jsonplaceholder.typicode.com/users/" + query)
        .then(response => response.json())
        .then(data => {
            // FLAW 4: Will throw undefined error if user isn't found
            display.innerHTML += "<p>Name: " + data.name + "</p>";
        });
}
