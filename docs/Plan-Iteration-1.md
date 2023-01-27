# Plan d'itération 2


## Étapes jalons

| Étape jalon          | Date       |
| :------------------- | :--------- |
| Début de l'itération | 2023/01/24 |
| Rapport préliminaire | 2020/10/09 |
| Fin de l'itération   | 2023/02/06 |

## Objectifs clés


- Concevoir l'interface du prototype 1 (JS ou Angular)
- Concevoir l'interface du prototype 2 (Python)
- Présenter une démonstration technique des CU01 et CU02 (avec tests)
- Analyser la viabilité des deux solutions 

## Identification des risques

- 
- 


## Affectations d'éléments de travail


Les éléments de travail suivants seront abordés dans cette itération:
 
| Nom / Description                | Priorité | [Taille estimée (points)](#commentEstimer "Comment estimer?") | Assigné à (nom) | Documents de référence |
| ---------------------------------| -------: | --------------------------: | --------------- | ---------------------- |
| Interface prototype executable 1 | 1        | 2  | Amokrane T et Nicolas  | Channel #décision-implémentation  |
| Interface prototype web 2        | 1        | 2  | Philippe et Samy       | Channel #décision-implémentation  |
| CU01 pour prototype executable 1 | 2        | 2  | Amokrane T et Nicolas  | dss-obtenirHoraire  |
| CU01 pour prototype web  2       | 2        | 2  | Philippe et Samy       | dss-obtenirHoraire |


## Problèmes

| Problèmes                                                                                            | Statut | Notes |
| ---------------------------------------------------------------------------------------------------- | ------ | ----- |
| La familiarisation avec JavaScript et les outils technologiques (Node, Express et Pug)                                                |Ouvert| 10    | 
| Génération des fichiers backups de type mbz       | Ouvert| 10 | 
|Déterminer l'horaire d'une activité selon les jours et les heures| Ouvert  |10

## Critères d'évaluation


- Lancement de l'interface utilisateur selon les les deux prototypes.

- Démonstration des fonctionnalités CU01 et CU02 pas à pas avec le Professeurs superviseur et ayant obtenue une réponse favorable.

## Évaluation de l'itération


| Cible d'évaluation | Itération 2        |
| ------------------ | ---------------- |
| Date d'évaluation  | 2 Février  2023                                                                                                          |
| Participants       | **Auteurs** :<br> Nicolas Plourde <br> Philippe Lepage <br> Amokrane Smail <br> Samy Mahiddine <br> Nadia Medkour <br><br> **Professeurs superviseur** :<br> Christopher Fuhrman <br> Ali Ouni                                                                 |
| État du projet     | <!-- *Rouge, Orange, ou Vert.* -->                                                                                         |

###  Évaluation par rapport aux objectifs

-   Concevoir l'interface du prototype 1
    >Aucun des membres de l'équipes n'a eu de problème avec l'installation de VSC et ses pluggins associés tels que plantuml 
    
-   Concevoir l'interface du prototype 2
    > Les CU01a et CU01b étaient fonctionnelles et toute la documentation était réalisée. Le chargé nous a donné des amélioration à faire dans l'écriture de nos DSS, MDD et RDCU

-   Présenter une démonstration technique des CU01 et CU02 (avec tests).
    > Les fonctionnalités générales pour le CU01 et le CU02 répondaient suffisament aux exigences de l'énoncé. Toutefois, une séparation entre la couche api et la couche interface doit être mieux implémentée. Les noms de toutes les routes devraient aussi correspondre aux opérations systèmes du controleur. ET Finalement, les tests devraient s'assurer de vérifier seulement des contenus de JSON et non du contenu HTML.


### Éléments de travail: prévus vs réalisés

Tous les éléments ont été complétés, mais il faut étoffer améliorer la séparation des couches api et interface, il faut améliorer les tests, et s'assurer du bon respect des nom de routes/opérations. Et il faut aussi modifier l'ajout de mots clés dans les questions pour accepter plusieurs string.

> Améliorer les tests assigné à christophe Rivard
> Renommer les noms de méthodes assigné à Christophe Tremblay
> Revisiter l'ajout de mots clés dans les questions assigné à Christophe Tremblay
> Améliorer la séparation entre les couches assignés à Christophe Tremblay

### Évaluation par rapport aux résultats selon les critères d'évaluation 

- La solution a répondu à la majortié des critères, toutefois certaines opérations systèmes n'étaient pas testées.
- La démo de l'itération 1 s'est bien passée, avec quelques points soulevés qui sont à changer durant la prochaine itération.
- Génération de testes unitaires qui offre une couverture du code de 80 % minimalement 

## Autres préoccupations et écarts

Nous devons trouver un autre moyen de bien séparer les routes pour le api et pour l'interface

## Évaluation du travail d'équipe

### Rapports de Git Inspector

#### Implémentation

> Insérez le tableau des résultats produits par le script

#### Analyse et conception

> Insérez le tableau des résultats produits par le script

#### Tests

> Insérez le tableau des résultats produits par le script

### Retour sur l'itération


#### Êtes-vous satisfaits de la contribution de chaque membre de l’équipe? Expliquez.
Oui, nous avons opté pour une approche en programmation de groupe avec l'extention LiveShare de VSCode. Celle-ci nous a permit de se familiariser avec l'environment de TypeScript ainsi que mettre en application nos décisions prises lors du développement de façon rapide et efficace.
#### Quelles solutions pouvez-vous mettre en place pour amener les membres de l’équipe à contribuer de façon satisfaisante?
Nous utiliserons l'outil de ticket de GitHub, ce qui permettera à l'équipe de répartir les tâches de façon équilibrée.
#### Êtes-vous satisfaits de la communication dans l’équipe? Expliquez.
Oui, nous avons créé un serveur Discord pour notre équipe. Lorsqu'on avançait dans le projet on en discutait ensemble avant de merge avec la branche principale. De plus, quand on avait des problème au niveau du codage (bugs) ou de la documentation, on n'hésitait pas à demander de l'aide aux coéquipiers via Discord. 
#### Quelles solutions pouvez-vous mettre en place pour améliorer la communication dans l'équipe?
Nous avons mis en place un tableau de bords de type Kanban qui nous permet de trier, assigner et savoir ou est rendu le projet.

---

<a name="commentPlanifier">Comment planifier une itération selon le
    processus unifié :</a>
    <https://docs.google.com/a/etsmtl.net/document/d/1xeCCdR4-sTznTPaSKYIl4l_bQi-gE5stPWSA5VArRlY/edit?usp=sharing>

<a name="commentEstimer">Comment estimer la taille :</a>
    <https://docs.google.com/a/etsmtl.net/document/d/1bDy0chpWQbK9bZ82zdsBweuAgNYni3T2k79xihr6CuU/edit?usp=sharing>
