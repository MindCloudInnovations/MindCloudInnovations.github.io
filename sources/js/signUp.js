async function validateAndSignUp(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, confirmPassword }),
        });

        if (response.ok) {
            alert("Account created successfully!");
        } else {
            const data = await response.json();
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}