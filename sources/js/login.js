async function attemptLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            window.location.href = 'http://localhost:63342/SemJapink.github.io/index.html?_ijt=hae1nmml1ue50seirscqi5b2o2';
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}