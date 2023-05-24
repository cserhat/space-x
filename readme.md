# Remarque

En utilisant l'API SpaceX, nous avons récupéré les données au format JSON et nous avons pu les traiter à l'aide de code JavaScript.

Nous n'avons pas pu afficher tous les détails des lancements de manière détaillée. Certaines données ont été manquantes ou limitées dans notre présentation.

J'ai fait de mon mieux pour rendre l'interface utilisateur responsive dans la partie frontale, mais je n'ai pas consacré suffisamment de temps au développement du front-end, donc j'ai opté pour une approche plus simple.

Je n'ai pas passé beaucoup de temps à parcourir la documentation de l'API SpaceX car elle était bien accompagnée d'exemples clairs, ce qui rendait l'API compréhensible et facile à utiliser. (https://docs.spacexdata.com/#5fc4c846-c373-43df-a10a-e9faf80a8b0a)

Au début, j'ai rencontré des problèmes avec le lien de l'API fourni et j'ai vérifié si les données étaient correctement récupérées en utilisant console.log.

# Notes

Utilisation de append en créent des un element sépare

var exemple_element_creation = $('<div class="exemple">');

exemple_element_creation.append(exemple);

$('.principal').append(exemple_element_creation);