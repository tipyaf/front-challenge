# NetheosFrontChallenge

Projet réalisé dans le cadre du challenge front-end de **[NETHEOS](http://www.netheos.com/)**.

#### Technos utilisées

**Angular 5.2.0** (CLI) + **[PrimeNG](https://www.primefaces.org/primeng/#/)** + **[json-server](https://github.com/typicode/json-server)** (pour simuler les appels REST)

## Installation et démarrage


#### 1. Installation des dépendances

- Installation des dépendances du projet.
```
$ npm i
```

### 2. Démarrage du projet front

```
$ npm run start
```
ou
```
$ ng serve
```
**Puis ouvrir le navigateur à cette adresse: [http://localhost:4200/](http://localhost:4200/)**

Pour se connecter:
1. En tant qu'administrateur
```
- Identifiant: admin
- Mot de passe: admin
```

2. En tant que simple utilisateur ayant un compte
```
- Identifiant: user
- Mot de passe: user
```


## Les choix des outils

1. Les outils
- Angular 5 (CLI) : Angular CLI a un ensemble d'outils pratiques qui permettent de facilité le développement, les tests , le contrôle du linter et la mise en production via une configuration de webpack de base complète et personnalisable. Le choix d'utiliser Angular 5 et Typescript vient d'une volonté de mieux structurer le code.
- PrimeNG : PrimeNg offre un ensemble de composants complets, perfomants et maintenable aisémment
- Lodash : Une librarie incontournable en Javascript qui assure un "cross browser" et un gain de temps pour le développement
- Jwt-token: Permet, **avec un vrai serveur**, de décoder et gérer les token pour gerer la connection des utilisateurs 

## L'implémentation
### Architecture
#### Projet
##### Le choix de segmenter au maximum a été fait. 

- app: Nous distinguons ce qui est partagé et ce qui appartient à une vue. Il y a aussi une notion de module. (par manque temps il y a souvent le dossier et pas le module :(. La notion est quand même présente.) 
- Assets et styles: Chaque vue et chaque component a son style (CSS) quand c'est necessaire. Tous les autres styles, qui sont partagés pour créer le thème, sont dans assets/theme/... ainsi que les images  dans assets/images/...
- Environements: Les variables d'environnement developpement et production. On peut y ajouter les bases Url, les différentes clés utilisées ...

#### Vues (router)

- Faq: La page où les questions sont accessibles à l'ensemble des utilisateurs. Elle a pour enfant un composant qui affiche la liste de question dans des "accordéons". Ainsi, nous n'affichons pas le tableau qu'utilise l'administration.
- Administration:  Elle a pour enfant la vue "list" (liste des questions) et add (ajout de questions)
- Login: Cette page renvoie automatiquement à Administration si le login est validé. Elle a pour enfant "forgiven-password" qui est une simulation d'un processus d'oubli de mot de passe.

Par défaut la vue affichée est faq.

#### Les choix plus personnels
 
- Le choix de rendre les vues assez autonomes, quitte à réécrire du code, est une volonté de flexibilité et de contrôle de chacune des vues.

- J'ai fait le choix de ne pas implémenter Faq et administration comme enfant d'une vue "home" qui aurait un menu et un router qui permetrait d'implémenter n'importe quelle autre contenu qu'une FAQ et son administration. Ce choix a été fait en considérant, que pour le moment, la seule fonction de l'application est de pourvoir afficher et manager des questions.

- Le projet dspose dispose du necessaire pour effectuer des tests. Par manque de connaissance en la matière et de temps, j'ai préféré me concentrer sur la réalisation de l'application.




