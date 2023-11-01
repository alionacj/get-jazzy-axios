function onReady() {
    // startup message
    console.log('Hello from client.js');


    // ##### RECIEVES & DISPLAYS ARTIST INFO#####
        // axios allows for communication between javascript and the browser (http requests)
        axios({
            // sends request
            method: 'GET',
            url: '/artist'
        }).then(function (response) {
                // Code that will run on successful response from the server.
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
            // error message
            }).catch(function (error) {
                console.log(error);
                alert('Something bad happened! Check the console for more details.')
            });


    // ##### RECIEVES AND DISPLAYS SONG INFO #####
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

}; onReady();


// sends form info to server
function handleSubmit (event) {
    event.preventDefault();

    // ##### send form data to server #####
        // declare variables to use in new object
        let artistName = document.getElementById('artistName').value;
        let artistBorn = document.getElementById('artistBorn').value;
        let artistDied = document.getElementById('artistDied').value;
        // create new object to send with form info
        let newArtist = {
            name: artistName,
            born: artistBorn,
            died: artistDied
        }
        // send new object to server in POST request
        axios({
            method: 'POST',
            url: '/artist',
            data: newArtist
        }).then((response) => {
            getArtist()
        })
        function getArtist() {
            axios({
                url: '/artist',
                method: 'GET'
            }).then((response) => {
                console.log('response.data', response.data)
                let newArtistArray = response.data
                renderArtists(newArtistArray)
            })
        }
        

    // let titleInput = document.getElementById('songTitle').value
    // let artistInput = document.getElementById('songArtist').value

    // let contentDiv = document.querySelector('#songTableBody');
    //     contentDiv.innerHTML += 
    //     `
    //         <tr>
    //             <td>${titleInput}</td>
    //             <td>${artistInput}</td>
    //         </tr>
    //     `;
    }

    function renderArtists(newArtistArray) {
        let artistList = document.getElementById('artistTableBody')
        artistList.innerHTML = ''
        for (let artist of newArtistArray){
            artistList.innerHTML +=
            `
            <tr>
                <td>${artist.name}</td>
                <td>${artist.born}</td>
                <td>${artist.died}</td>
            </tr>
            `
        }
        
    }