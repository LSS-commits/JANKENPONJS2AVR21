# Sujet de rattrapage : JanKenPon

Vous allez aider à la correction et finalisation du jeu "Jan Ken Pon", qui est la dénomination japonaise de "Pierre-Feuille-Ciseaux".

Rappel des règles :
- La Pierre bat les Ciseaux
- Les Ciseaux battent la Feuille
- La Feuille bat la Pierre

Chaque victoire rapporte 1 point au joueur gagnant.

Il n'y a pas d'autres règles.

## Objectif

Le développeur en charge de ce projet n'a pas pu finir la demande initiale du Jan Ken Pon. C'est ta mission de finaliser le jeu pour qu'il soit fonctionnel.

Tu remarqueras donc que le jeu ne fonctionne pas en l'état en cliquant sur le bouton PLAY!. Tu devras :
- Ajouter le code manquant (à plusieurs endroits) pour que le jeu fonctionne
- Corriger les erreurs de code et de logique laissées par le développeur en charge du projet

## Notation

La note maximale est de 20 points :
- 10 Points sur l'écriture, la logique et la propreté du code
- 10 Points max sur la finalisation du projet
- 2 Points bonus sur l'ajout d'un bouton qui permet de réinitialiser les scores à 0 (il faudra modifier le code HTML pour ajouter un bouton)

## Remarques

- Tout se passe dans le fichier `main.js`, tu n'as pas besoin de modifier le code HTML ni la feuille de style CSS (sauf pour le point bonus)
- Sois méthodique, prends le temps de comprendre le rôle de chaque classe et le lien entre elles
- Utilise bien l'inspecteur et la console de débogage (touche F12 du clavier) pour relever les erreurs du code et savoir d'où cela provient
- N'hésite pas à utiliser `console.log()` pour vérifier la valeur d'une variable pendant ton debug !


## CORRECTION 

https://github.com/Maus3rSR/JanKenPon-Pure-Javascript-Example


## A RETENIR

# - What do @private, @public, @class, and @param mean in JavaScript ?
https://stackoverflow.com/questions/48759485/what-do-private-public-class-and-param-mean-in-js

Example:

``
/**
 * Event functions references.
 * @private
 */
e = {
    _onDragStart: null,
    _onDragMove: null,
    _onDragEnd: null,
    _transitionEnd: null,
    _resizer: null,
    _responsiveCall: null,
    _goToLoop: null,
    _checkVisibile: null
};

/**
 * Creates a carousel.
 * @class The Owl Carousel.
 * @public
 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
 * @param {Object} [options] - The options
 */
function Owl(element, options) {

    /**
     * Current settings for the carousel.
     * @public
     */
    this.settings = null;
``

-> EXPLANATION: These are known as Tags in Javascript. They are used for documentation (comments for the developer and possibly can be used by an auto documentation tool or IDE for syntax help). They help programmers to understand the code better. Let us take one by one from the above example.

The @private tag marks a symbol as private, or not meant for general use.

    So, variable e is supposed to be private and shouldn't be accessed outside the current class.

The @class tag marks a function as being a constructor, meant to be called with the new keyword to return an instance.

    So here it says that function Owl is a constructor function and should be called with a new keyword while being invoked.

The @public opposed to @private suggests that the function is publicly available to be accessed outside the current context.

    Hence, owl function can be called outside the current class.

The @param describes the parameters of the function. There are three parts of it. First is within {}. It suggests the type of the param. Second is name of the param. Third is after the hyphen(-) sign. It describes the parameter.

    So, we have two parameters here. First is of HTMLElement or jQuery type, named element which has description : The element to create the carousel for. Second is of Object type named options with description : The options.

# - Pour afficher une description de la classe (utilité) au survol du mot dans le document, mettre la description avant la classe en commentaire /** */

    ``
    /**
     * Classe qui représente le Jeu Jan-Ken Pon et permet de lancer une partie
     */
    class Game {
    ``

# - parseInt
    ``
    this.scoreValue = parseInt(value, 10) 
    ``

    parseInt(string {= Required. The string to be parsed}, radix {= Optional. A number (from 2 to 36) that represents the numeral system to be used. As of ECMAScript 5, default is 10, decimal radix})
    
    Returns a number. If the first character cannot be converted to a number, NaN is returned
    --> parseInt convertit une string en int, 10 = paramètre qui spécifie le système numéral, ici en décimal

# - Les exceptions (throw) bloquent l'exécution du code (fonction en cours stoppée et ce qui suit n'est pas exécuté )

    ``
    updateUI() {
        throw "[Error] Not implemented"
    }

    ``

    The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack. If no catch block exists among caller functions, the program will terminate.

    Use the throw statement to throw an exception. When you throw an exception, expression specifies the value of the exception. Each of the following throws an exception:

    throw "Error2"; // generates an exception with a string value
    throw 42; // generates an exception with the value 42
    throw true; // generates an exception with the value true

# - Pourquoi les mains ne s'affichent pas ???
    ``
    this.image_element = null 
    ``
    au lieu de  

    ``      
    this.image_element = this.element.querySelector('img')   
    ``

    + RETIRER LES EXCEPTIONS (throw) qui empêchent l'exécution du code

# - element.textContent
    ``
    this.element.textContent = this.score
    ``
    textContent récupère le contenu de tous les éléments, y compris <script> et <style>, ce qui n'est pas le cas de innerText. innerText prend en compte le style de l'élément et ne retournera rien pour les éléments cachés.

    --> Récupère le contenu des balises html qui affichent le score          <span class="score score__left">0</span>
    <span class="score score__right">0</span>


# - QUESTIONS POUR KEVIN (avec captures)
    
    - // QUE FAIT CETTE LIGNE ET POURQUOI CETTE SYNTAXE ?
    this.hand_container_element = document.querySelector(hand_container_selector)
    
    - Comment faire en sorte que la partie s'arrête à 5 et se remette à zéro ?
        for dans classe ScoreUI affiche le score 6
    ``   
    // Mise à jour de l'affichage du score
    updateUI() { this.element.textContent = this.score }
    // Ajout des points (1 victoire = 1 point)
    addPoint() { 
        for (this.score = 0; this.score <= 5; this.score++) {
            this.score++;
        }

    }
    // Remise à zéro du score
    reset() { 
        if (this.score === 6) this.score = 0 
        }
    ``

