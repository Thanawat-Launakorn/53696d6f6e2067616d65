const buttonColours = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let start = false
let level = 0

$('body').keypress(() => {
    if (!start) {
        $('#level-title').text(`Level ${level}`)
        nextSequence()

        start = true
    }
})

$('.btn').click((e) => {
    const userChosenColour = e.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)


})

function nextSequence() {
    level++
    $('#level-title').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    userClickedPattern = []
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

function animatePress(currentColor) {
    let animation = $(`#${currentColor}`)
    animation.addClass('pressed')
    setTimeout(() => {
        animation.removeClass('pressed')
    }, 100)
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length)
            setTimeout(() => {
                nextSequence()

            }, 1000)
    } else {
        $('h1').text('Game Over, Press Any Key to Restart')
        playSound('wrong')
        $('body').addClass('game-over')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200)
        startOver()
    }
}

function startOver() {
    start = false
    level = 0
    gamePattern = []
}