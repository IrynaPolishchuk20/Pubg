class Armor{
    constructor(level){
        this.level = level
        this.protection = [0, 0.2, 0.4, 0.6][level]
    }
}

class Player{
    constructor(helmentLevel, vestLevel){
        this.health = 100
        this.helment = new Armor(helmentLevel) ///шолом
        this.vest = new Armor(vestLevel) /// бронь 
    }

    takeDamage(damage, bodyPart){
        let protection = 0
        if(bodyPart === 'head') protection = this.helment.protection
        if(bodyPart === 'body') protection = this.vest.protection

        let finalDamage = damage * (1 - protection)
        this.health -= finalDamage

        if(this.health < 0) this.health = 0
        document.getElementById('health').innerText = `Health: ${this.health}`
        document.getElementById('damageInfo').innerText = `Hit: ${bodyPart} | Damage: ${finalDamage.toFixed(1)}`

        if (this.health <= 0) {
            document.getElementById('damageInfo').innerText = 'Player Knocked!'
            // document.getElementById('targetImage').src = 'img/knocked.jpg'
            document.getElementById('targetImage').style.opacity = '0.4'
        }
    }
}

class Game{
    constructor(){
        const helmetLevel = parseInt(document.getElementById('helmetLevel').value)
        const vestLevel = parseInt(document.getElementById('vestLevel').value)
        this.player = new Player(helmetLevel, vestLevel)
        this.weapon = document.getElementById('weapon').value

        document.getElementById('damageInfo').innerText = 'Cleack on the target to shoot!'
        document.getElementById('targetImage').style.opacity = '1'
        document.getElementById('health').innerText= 'Health: 100'
    }

    shot(event){
        let x = event.offsetX
        let y = event.offsetY
        let bodyPart = this.getBodyPart(x,y)

        let baseDamage = {
            'Beryl_M762': 47,
            'Mk47_Mutant': 49,
            'R45': 54
        }[this.weapon]

        let damageMap = {
            'head':5,
            'body': 1.5,
            'legs': 1,
            'arms': 0.8
        }[bodyPart] 

        if(bodyPart) this.player.takeDamage(baseDamage * damageMap, bodyPart)
    }

    getBodyPart(x,y){
        console.log(`x:${x} y:${y}`);
        if(y > 1 && y < 50 && x > 115 && x < 170) return 'head'
        if(y > 50 && y < 160 && x > 120 && x < 185) return 'body'
        if(y > 160 && y < 302 && x > 116 && x < 130) return 'legs'
        if(y > 160 && y < 302 && x > 165 && x < 200) return 'legs'
        if(y > 65 && y < 185 && x > 65 && x < 85) return 'arms'
        if(y > 65 && y < 185 && x > 80 && x < 100) return 'arms'
        if(y > 65 && y < 185 && x > 65 && x < 120) return 'arms'
        if(y > 65 && y < 185 && x > 65 && x < 120) return 'arms'
        if(y > 65 && y < 185 && x > 200 && x < 230) return 'arms'
        return

    }

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startGame').addEventListener('click', () => {
        window.game = new Game()
    })
    document.getElementById('targetImage').addEventListener('click', (event) => {
        if(window.game) window.game.shot(event)
    })
})
