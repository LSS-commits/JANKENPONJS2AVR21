window.onload = () => {
    // Point d'entrée du script

    // C'est ici qu'on initialise les classes
    const player1 = new Player(
            new ScoreUI('.score__left'),
            new HandUI('.hand__left')
        ),
        player2 = new Player(
            new ScoreUI('.score__right'),
            new HandUI('.hand__right')
        ),
        game = new Game(player1, player2, '.hand_container'),
        scoreLeft = new ScoreUI('.score__left', '#reset_button'),
        scoreRight = new ScoreUI('.score__right', '#reset_button')

    console.log(scoreLeft)
    // et qu'on gère le bouton play pour lancer une partie
    document.querySelector('#play_button').addEventListener('click', event => {
        // On doit aussi gérer l'affichage et le désaffichage du bouton "play"
        event.target.hidden = true
        game.onPlayed = () => event.target.hidden = false
        game.play()
    })

    // et qu'on gère le bouton reset game pour réinitialiser les scores à 0
    document.querySelector('#reset_button').addEventListener('click', () => {
        scoreLeft.reset()
        scoreRight.reset()
        scoreLeft.updateUI() = this.element.textContent = this.score
        scoreRight.updateUI() = this.element.textContent = this.score
    })

}

/**
 * Classe qui représente le Jeu Jan-Ken Pon et permet de lancer une partie
 */
class Game {
    // The @param tag provides the name, type, and description of a function parameter. Not mandatory, tags in JS for documentation 
    /**
     * 
     * @param {Player} player1 
     * @param {Player} player2 
     * @param {String} hand_container_selector 
     */
    constructor(player1, player2, hand_container_selector) {
        this.player1 = player1
        this.player2 = player2
        this.is_animation_end = false // animationend event is fired twice because each element will trigger the event, that's why we need a boolean

        // QUE FAIT CETTE LIGNE ET POURQUOI CETTE SYNTAXE ?
        this.hand_container_element = document.querySelector(hand_container_selector)
    }

    play() {
        this.reset()
        this.hand_container_element.classList.toggle('shuffle') // Lance l'animation du jeu (shuffle = animation en css/js, voir style.css)

        this.hand_container_element.addEventListener('animationend', () => {
            if (this.is_animation_end) return

            // Section coeur qui gère la logique d'une partie lancée
            // Il faut récupérer le choix de chaque joueur
            const element1 = this.player1.getChoice(),
                element2 = this.player2.getChoice()

            // Mettre à jour les mains par rapport au choix
            this.is_animation_end = true
            this.player1.handUI.updateUI(element1)
            this.player2.handUI.updateUI(element2)

            // Déterminer qui a gagné
            if (element1.isBeatenBy(element2)) this.player2.win()
            else if (element2.isBeatenBy(element1)) this.player1.win()


            // Relancer l'animation du jeu et afficher le bouton play
            this.hand_container_element.classList.toggle('shuffle')
            this.onPlayed()

        })
    }

    // On remet à les mains à zéro (position par défaut)
    reset() {
        this.is_animation_end = false
        this.player1.handUI.reset()
        this.player2.handUI.reset()
    }

    onPlayed = () => {}
}

/**
 * Classe Player qui représente un joueur
 */
class Player {
    /**
     * 
     * @param {ScoreUI} scoreUI 
     * @param {HandUI} handUI 
     */
    constructor(scoreUI, handUI) {
        this.scoreUI = scoreUI
        this.handUI = handUI
    }

    // Lorsque le joueur gagne, on lui ajoute 1 point
    win() {
        this.scoreUI.addPoint()
    }
    // On récupère le choix des joueurs généré aléatoirement
    getChoice() {
        return JanKenPon.getRandom()
    }
}

/**
 * Classe HandUI qui permet de gérer une main qui représente Jan-Ken Pon sur la page web
 */
class HandUI {
    /**
     * 
     * @param {String} hand_selector 
     */
    constructor(hand_selector) {
        // Pour afficher les mains au lieu du texte left/right hand
        this.element = document.querySelector(hand_selector)
        this.image_element = this.element.querySelector('img')
        this.reset()
    }

    // Image des mains injectée dans le html
    set image(image_name) {
        this.image_element.setAttribute('src', `images/${image_name}.png`)
    }

    // Mise à jour de l'image
    updateUI(element) {
        this.image = element.name
    }
    // Remise à zéro des mains par affichage de la figure par défaut
    reset() {
        this.updateUI(JanKenPon.default)
    }
}

/**
 * Classe ScoreUI qui permet de gérer le score sur la page web
 */
class ScoreUI {
    /**
     * 
     * @param {String} score_selector 
     */
    constructor(score_selector) {
        this.element = document.querySelector(score_selector)
        this.reset()
    }

    // On récupère le score lié à la partie et on le met à jour
    get score() {
        return this.scoreValue
    }
    set score(value) {
        this.scoreValue = parseInt(value, 10) //parseInt convertit une chaîne de caractères (value) en nombre, 10 = paramètre qui spécifie le système numéral utilisé, ici en décimal
        this.updateUI()
    }

    // Mise à jour de l'affichage du score
    updateUI() {
        this.element.textContent = this.score
    }
    // Ajout des points (1 victoire = 1 point)
    addPoint() {
        this.score++
    }
    // Remise à zéro du score
    reset() {
        this.score = 0
    }
}

/**
 * Classe utilitaire qui gère les éléments Pierre/Feuille/Ciseaux
 */
class JanKenPon {
    static ELEMENTS = {
        ROCK: {
            name: "rock",
            isBeatenBy: element => element.name === this.ELEMENTS.PAPER.name
        },
        PAPER: {
            name: "paper",
            isBeatenBy: element => element.name === this.ELEMENTS.SCISSOR.name
        },
        SCISSOR: {
            name: "scissor",
            isBeatenBy: element => element.name === this.ELEMENTS.ROCK.name
        }
    }

    // Figure des mains par défaut = pierre (rock)
    static
    default = this.ELEMENTS.ROCK

    /**
     * Récupère au hasard un élément Pierre, Feuille ou Ciseaux
     */
    static getRandom() {
        const ELEMENTS_ARRAY = Object.keys(this.ELEMENTS),
            RANDOM_NUM = Math.floor(Math.random() * ELEMENTS_ARRAY.length)

        return this.ELEMENTS[ELEMENTS_ARRAY[RANDOM_NUM]]
    }
}