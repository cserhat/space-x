/* SPACE X API */

$(document).ready(function() {

    var api = "https://api.spacexdata.com/v3/launches/next";
    $.getJSON(api, function(data) {
    Launchinfo(data);
    LaunchListe('all');
    

    // Fonction de compte à rebours pour afficher le temps restant jusqu'au prochain lancement
    // Convertit les dates en millisecondes et calcule la différence
    // Calcule ensuite les jours, heures, minutes et secondes restantes et les affiche dans le DOM
    function compteur()
    {
        var date = new Date($('.date').text()).getTime();
        var now = new Date().getTime();
        var tempcal = date - now;

        var seconds = Math.floor((tempcal / 1000) % 60);
        var minutes = Math.floor((tempcal / 1000 / 60) % 60);
        var heurres = Math.floor((tempcal / (1000 * 60 * 60)) % 24);
        var jours = Math.floor((tempcal / (1000 * 60 * 60 * 24)));

        $('.compteur').text(jours + 'jours' + heurres + 'heurre' + minutes + 'minutes' + seconds + 'seconde reste');
    }   

    // Fonction pour afficher les informations du prochain lancement
    // Récupère le nom et la date du lancement à partir des données fournies
    // Affiche ensuite ces informations dans le DOM
    // Appelle également la fonction compteur pour afficher le compte à rebours du temps restant jusqu'au lancement
    // Actualise le compte à rebours toutes les secondes en utilisant setInterval
    function Launchinfo(data)
    {
        var nom = data.mission_name;
        var date = data.launch_date_utc;
        console.log(nom, date);

        $('.nom').text(nom);
        $('.date').text(date);

        compteur();
        setInterval(compteur, 1000);
    }


    function LaunchListe(filter)
    {
        // Récupère toutes les données de l'API SpaceX pour les lancements
        var apil = 'https://api.spacexdata.com/v3/launches';
        $.getJSON(apil, function(data)
        {
            var filtreLaunch = [];

            if(filter === 'tous')
            {
                filtreLaunch = data;
            } 
            // Filtre les lancements réussis
            else if (filter === 'reussis')
            {
                filtreLaunch = data.filter(function(launch)
                {
                    return launch.launch_success === true;
                });
            }
            // Filtre les lancements échoués
            else if (filter === 'echoues' )
            {
                filtreLaunch = data.filter(function(launch)
                {
                    return launch.launch_success === false;
                });
            }
            $('.space').empty();
           // Affiche uniquement les 10 derniers lancements filtrés
            var affichelaunches = filtreLaunch.slice(0,10);
            affichelaunches.forEach(function(launch){
                var cardresultat = $('<div class="card">');
                var nom = $('<h2>').text(launch.mission_name);
                var date = $('<span>').text('Date: ' + formatDate(launch.launch_date_local));
                var missionImage = $('<img>').attr('src', launch.links.mission_patch_small);
                var youtubeLink = $('<a>').attr('href', launch.links.video_link).text('Voir le video');
                var missionDetails = $('<p>').text('Mission Details: ' + launch.details);
                 // Ouvre la vidéo YouTube de la mission dans une fenêtre contextuelle intégrée
                youtubeLink.on('click', function(e) {
                e.preventDefault();
                var videoURL = launch.links.video_link.replace('watch?v=', 'embed/');
                window.open(videoURL, 'Mission Video', 'width=800,height=600');
                });
                var launchSite = $('<p>').text('Lieu de lancement: ' + launch.launch_site.site_name);
                var articleLink = $('<a>').attr('href', launch.links.article_link).text('Voir article');
                var payloads = $('<p>').text('Payloads: ' + launch.rocket.second_stage.payloads.map(function(payload) {
                    return payload.payload_id;
                  }).join(', '));
                  var customers = $('<p>').text('Customers: ' + launch.rocket.second_stage.payloads.map(function(payload) {
                    return payload.customers.join(', ');
                  }).join(', '));
                  
                // Ajoute les éléments au conteneur de la carte
                cardresultat.append(nom);
                cardresultat.append(missionDetails);
                cardresultat.append(missionImage);
                cardresultat.append(articleLink);
                cardresultat.append(youtubeLink);
                cardresultat.append(launchSite);
                cardresultat.append(payloads);
                cardresultat.append(customers);
                cardresultat.append(date);
                // Ajoute la carte au conteneur principal
                $('.space').append(cardresultat);
                return cardresultat;
            });
        }
        )
    }

    $('#filtre').change(function()
    {
        // Lorsque l'option de filtre sélectionnée est modifiée
        var selectedFiltre = $(this).val();
        LaunchListe(selectedFiltre);
    });
    
    });

    
    function formatDate(date) {
         // Formate la date au format "Jour/Mois/Année"
    var options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }

});