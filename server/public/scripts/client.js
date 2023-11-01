function onReady() {
    console.log('Hello from client.js');

    // axios allows for communication between javascript and the browser (http requests)
    axios({
        // sends request
        method: 'GET',
        url: '/artist'
    })
        .then(function (response) {
            // Code that will run on successful response
            // from the server.

            // where is this?
            console.log(response);

            // quotesFromServer will be an Array of quotes (from response packet)
            let quotesFromServer = response.data;

            // dom manipulation with content retrieved
            let contentDiv = document.querySelector('#artistTableBody');
            for (let artist of quotesFromServer) {
                contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
            }
    
        }).catch(function (error) {
            // Code that will run on any errors from the server.
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });

    // TODO Add Axios request for /songs and display on DOM
    axios({
        method: 'GET',
        url: '/song'
    })
        .then(function (response) {
            console.log(response)
            let quotesFromServer = response.data;
            let contentDiv = document.querySelector('#songTableBody');
            for (let song of quotesFromServer) {
                contentDiv.innerHTML +=`
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                </tr>
            `;
            }
        }).catch(function (error) {
            console.log(error);
            alert('Something bad happened! Check the console for more details.')
        });

}

onReady();

// sends form info to server
function handleSubmit (event) {
    event.preventDefault();

    let titleInput = document.getElementById('songTitle').value
    let artistInput = document.getElementById('songArtist').value

    let contentDiv = document.querySelector('#songTableBody');
        contentDiv.innerHTML += 
        `
            <tr>
                <td>${titleInput}</td>
                <td>${artistInput}</td>
            </tr>
        `;
    }