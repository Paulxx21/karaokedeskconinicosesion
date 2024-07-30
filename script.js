function addArtist() {
    // Tu código existente para agregar artistas
    var artistName = document.getElementById('artistName').value;
    var artistImage = document.getElementById('artistImage').files[0];
    var songs = [];

    var songInputs = document.querySelectorAll('.songInput');
    songInputs.forEach(function(songInput) {
        var song = songInput.querySelector('input').value;
        songs.push(song);
    });

    if (songs.length === 0) {
        alert("Debes agregar al menos una canción.");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var artistDiv = document.createElement('div');
        artistDiv.className = 'artist';
        artistDiv.id = 'artist' + artistCount;

        var artistContent = '<div><h3 onclick="toggleArtistOptions(\'artist' + artistCount + '\')">' + artistName + ' &#9660;</h3><ul class="songs">';
        songs.forEach(function(song, index) {
            artistContent += '<li><input type="radio" id="' + artistName.replace(/\s+/g, '').toLowerCase() + index + '" name="song" value="' + song + '" onclick="solicitarNombre(\'' + artistName + '\', \'' + song + '\')"><label for="' + artistName.replace(/\s+/g, '').toLowerCase() + index + '"> ' + song + '</label></li>';
        });
        artistContent += '</ul></div>';
        artistContent += '<img src="' + e.target.result + '" alt="' + artistName + '">';

        artistDiv.innerHTML = artistContent;
        document.getElementById('songForm').appendChild(artistDiv);

        var option = document.createElement('option');
        option.value = 'artist' + artistCount;
        option.text = artistName;
        document.getElementById('artistToRemove').appendChild(option);

        artistCount++;

        document.getElementById('artistName').value = '';
        document.getElementById('artistImage').value = '';
        var songInputs = document.querySelectorAll('.songInput');
        songInputs.forEach(function(songInput) {
            songInput.parentNode.removeChild(songInput);
        });
        document.getElementById('songInputs').innerHTML = '';

        updateQRCodeAndLink();
    };
    reader.readAsDataURL(artistImage);
}

function removeArtist() {
    var artistToRemove = document.getElementById('artistToRemove').value;
    var artistElement = document.getElementById(artistToRemove);
    if (artistElement) {
        artistElement.parentNode.removeChild(artistElement);

        var select = document.getElementById('artistToRemove');
        select.remove(select.selectedIndex);

        if (select.options.length === 0) {
            document.getElementById('removeArtistForm').classList.remove('active');
        }

        updateQRCodeAndLink();
    }
}

function toggleArtistOptions(artistId) {
    var removeArtistForm = document.getElementById('removeArtistForm');
    if (removeArtistForm.classList.contains('active')) {
        removeArtistForm.classList.remove('active');
    } else {
        var select = document.getElementById('artistToRemove');
        select.innerHTML = '';

        var artists = document.querySelectorAll('.artist');
        artists.forEach(function(artist) {
            var artistName = artist.querySelector('h3').textContent.trim();
            var option = document.createElement('option');
            option.value = artist.id;
            option.textContent = artistName;
            select.appendChild(option);
        });

        document.getElementById('removeArtistForm').classList.add('active');
    }
}
