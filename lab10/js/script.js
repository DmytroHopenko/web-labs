const usersList = document.getElementById('users-list');
const addUserBtn = document.getElementById('add-user-btn');
const messagesList = document.getElementById('messages-list');
const randomUserApi = 'https://randomuser.me/api/';
const randomTextApi = 'https://fakerapi.it/api/v1/texts?_quantity=1&_characters=80';
const users = [];

function createUserElement(user) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-item');
    userDiv.innerHTML = `
        <strong>${user.name.last} ${user.name.first}</strong><br>
        ${user.location.city}, ${user.phone}
    `;
    return userDiv;
}

function addUserToList(user) {
    const userElement = createUserElement(user);
    usersList.appendChild(userElement);
    users.push(user);
}

function fetchRandomUser() {
    fetch(randomUserApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                addUserToList(data.results[0]);
            }
        })
        .catch(error => {
            console.error('Error while getting random user:', error);
        });
}

function createMessageElement(user, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-item');
    messageDiv.innerHTML = `<strong>${user.name.last} ${user.name.first}:</strong> ${message}`;
    return messageDiv;
}


function addMessageToList(user, message) {
    const messageElement = createMessageElement(user, message);
    messagesList.appendChild(messageElement);
    messagesList.scrollTop = messagesList.scrollHeight;
}


function generateRandomMessage() {
    if (users.length > 0) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomUserIndex];
        const randomDelay = Math.floor(Math.random() * (30000 - 5000 + 1) + 5000);

        fetch(randomTextApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.data && data.data.length > 0 && data.data[0].content) {
                    addMessageToList(randomUser, data.data[0].content);
                    setTimeout(generateRandomMessage, randomDelay);
                } else {
                    console.warn('Got invalid data text:', data);
                    setTimeout(generateRandomMessage, randomDelay);
                }
            })
            .catch(error => {
                console.error('Error while geting text:', error);
                setTimeout(generateRandomMessage, randomDelay);
            });
    } else {
        setTimeout(generateRandomMessage, 5000);
    }
}

addUserBtn.addEventListener('click', fetchRandomUser);

generateRandomMessage();

fetchRandomUser();