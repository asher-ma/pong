sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    ballSprite.vx = 60
    ballSprite.vy = (ballSprite.y - paddleSprite.y) * 8
})
function restart () {
    ballSprite.setVelocity(list._pickRandom(), list._pickRandom())
    paddleSprite.setPosition(14, 60)
    enemyPaddleSprite.setPosition(146, 60)
    ballSprite.setPosition(80, 60)
    enemyPaddleSprite.vy = 0
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    ballSprite.vx = -60
    ballSprite.vy = (ballSprite.y - enemyPaddleSprite.y) * 8
})
let enemyPaddleSprite: Sprite = null
let paddleSprite: Sprite = null
let ballSprite: Sprite = null
let list: number[] = []
list = [60, -60]
scene.setBackgroundColor(9)
ballSprite = sprites.create(assets.image`ballImg`, SpriteKind.Projectile)
ballSprite.setVelocity(list._pickRandom(), list._pickRandom())
ballSprite.setBounceOnWall(true)
paddleSprite = sprites.create(assets.image`paddleImg`, SpriteKind.Player)
paddleSprite.setPosition(14, 60)
controller.moveSprite(paddleSprite, 0, 100)
paddleSprite.setStayInScreen(true)
enemyPaddleSprite = sprites.create(assets.image`paddleImg`, SpriteKind.Enemy)
enemyPaddleSprite.setPosition(146, 60)
enemyPaddleSprite.setStayInScreen(true)
game.onUpdate(function () {
    if (ballSprite.x > 155) {
        game.showLongText("Player 1 Score!", DialogLayout.Center)
        info.setScore(info.score() + 1)
        restart()
    } else if (ballSprite.x < 5) {
        game.showLongText("Player 2 Score!", DialogLayout.Center)
        info.player2.setScore(info.player2.score() + 1)
        restart()
    }
})
game.onUpdateInterval(randint(100, 300), function () {
    if (ballSprite.y > enemyPaddleSprite.y + 5) {
        enemyPaddleSprite.vy = 80
    } else if (ballSprite.y < enemyPaddleSprite.y - 5) {
        enemyPaddleSprite.vy = -80
    } else {
        enemyPaddleSprite.vy = 0
    }
})
