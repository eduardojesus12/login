const $loadUsers = document.querySelector('#loadUsers');

$loadUsers.addEventListener('click', () => {

    const token = localStorage.getItem('token') || null;

    fetch('http://localhost:8080/api/user/all', {
        method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
    }).then(resp => {
        if(resp.status == 403) {
            localStorage.removeItem('token');
            url = window.location;
            const path = url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1)
            location.href = path +  'index.html';
        }

        return resp.json();
        
    } ).then(resp => {

        const cards = document.createElement('div');
        document.body.appendChild(cards);
        resp.forEach(user => {
            let card = document.createElement('div');
                card.classList = 'card';
                card.innerHTML = `
                <div class="card">
                    <img src="https://electronicssoftware.net/wp-content/uploads/user.png" alt="..." height="250" width="250">
                    <div class="card-body">
                        <p class="card-text">${user.name}</p>
                        <p class="card-text">${user.surname}</p>
                    </div>
                </div>
                `;
            cards.appendChild(card);
        });

        document.body.appendChild(cards);
    })
})