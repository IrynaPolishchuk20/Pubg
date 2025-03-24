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
            'R45': 54,
            'P92': 34,
            'P18C': 22
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
        if(y > 1 && y < 50 && x > 120 && x < 175) return 'head'
        if(y > 50 && y < 160 && x > 120 && x < 185) return 'body'
        if(y > 160 && y < 302 && x > 165 && x < 200) return 'legs'
        if(y > 175 && y < 215 && x > 105 && x < 145) return 'legs'
        if(y > 215 && y < 260 && x > 105 && x < 130) return 'legs'
        if(y > 230 && y < 245 && x > 100 && x < 135) return 'legs'
        if(y > 260 && y < 302 && x > 95 && x < 130) return 'legs'
        if(y > 60 && y < 80 && x > 110 && x < 120) return 'arms'
        if(y > 65 && y < 75 && x > 110 && x < 125) return 'arms'
        if(y > 70 && y < 75 && x < 200 && x > 185) return 'arms'
        if(y > 75 && y < 75 && x < 200 && x > 185) return 'arms'
        if(y > 85 && y < 100 && x < 205 && x > 190) return 'arms'
        if(y > 95 && y < 115 && x > 95 && x < 115) return 'arms'
        if(y > 100 && y < 115 && x > 95 && x < 115) return 'arms'
        if(y > 100 && y < 115 && x < 210 && x > 190) return 'arms'
        if(y > 110 && y < 130 && x > 90 && x < 110) return 'arms'
        if(y > 115 && y < 120 && x < 215 && x > 195) return 'arms'
        if(y > 120 && y < 130 && x < 215 && x > 200) return 'arms'
        if(y > 120 && y < 135 && x > 80 && x < 100) return 'arms'
        if(y > 130 && y < 140 && x < 225 && x > 206) return 'arms'
        if(y > 135 && y < 140 && x < 220 && x > 205) return 'arms'
        if(y > 135 && y < 145 && x > 80 && x < 100) return 'arms'
        if(y > 140 && y < 150 && x > 75 && x < 90) return 'arms'
        if(y > 140 && y < 150 && x < 230 && x > 215) return 'arms'
        if(y > 140 && y < 115 && x < 225 && x > 210) return 'arms'
        if(y > 150 && y < 150 && x < 225 && x > 215) return 'arms'
        if(y > 155 && y < 160 && x < 230 && x > 215) return 'arms'
        if(y > 155 && y < 150 && x < 230 && x > 215) return 'arms'
        if(y > 160 && y < 170 && x > 70 && x < 90) return 'arms'
        if(y > 170 && y < 175 && x > 70 && x < 85) return 'arms'
        if(y > 175 && y < 165 && x < 235 && x > 215) return 'arms'
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
