const keys = document.querySelectorAll('.btn');
const tiles = document.querySelectorAll('.tile');

let x = 1;
let y = 1;
let letter = '';
let word = '';
let answer = 'LOVEU';

keys.forEach(key => {
    key.addEventListener('click', () => {
        letter = key.id;
        updatetile(letter);
    });
});

function updatetile(n) {
    if (n == 'ENTER') {
        if (x <= 5)
            return;
        compare();
        if (word == answer) {
            keys.disabled = true;
            animate();
            return;
        }
        word = '';
        x = 1;
        y += 1;
        if (y > 5) {
            keys.disabled = true;
            document.getElementById('btns').style.display = 'flex';
        }
        return;
    } else if (n == 'DEL') {
        if(x == 1)
            return;
        if (word == answer)
            return;
        const tileid = `r${y}t${x - 1}`;
        const tile = document.getElementById(tileid);
        tile.textContent = '';
        x -= 1;
        word = word.substring(0, word.length - 1);
        return;
    }
    
    if (x > 5)
        return;
    
    const tileid = `r${y}t${x}`;
    const tile = document.getElementById(tileid);
    word += n;
    
    tile.textContent = n;
    x += 1;
}

function compare() {
    for (let i = 0; i < 5; i++) {
        let tileid = `r${y}t${i + 1}`;
        if (word[i] == answer[i]) {
            document.getElementById(tileid).style.background = 'green';
            document.getElementById(word[i]).style.background = 'green';
            document.getElementById(tileid).style.boxShadow = '0 4px 0 #18a843';
            document.getElementById(word[i]).style.boxShadow= '0 4px 0 #18a843';
        } else if (answer.includes(word[i])) {
            document.getElementById(tileid).style.background = 'orange';
            document.getElementById(tileid).style.boxShadow = '0 4px 0 #c07300';
        } else {
            document.getElementById(word[i]).style.background = 'red';
            document.getElementById(word[i]).style.boxShadow = '0 4px 0 #ff4343';
            document.getElementById(word[i]).disabled = true;
        }
    }
}

document.getElementById('play').addEventListener('click', () => {
    document.getElementById('btns').style.display = 'none';
    x = 1;
    y = 1;
    word = '';
    keys.forEach(key => {
        key.style.boxShadow = '0 4px 0 #555555';
        key.style.background = 'linear-gradient(to bottom, #4d4d4d 0%, #424242 100%)';
        key.disabled = false;
    });
    tiles.forEach(tile => {
        tile.style.boxShadow = '0 4px 0 #555555';
        tile.style.background = 'linear-gradient(to bottom, #4d4d4d 0%, #424242 100%)';
        tile.textContent = '';
    });
});

async function animate() {
    keys.forEach((key, index) => {
        setTimeout(() => {
            key.classList.add("animate");
        }, index * 50); 
    });
    await sleep(4000);
    document.getElementById('keyboard').style.display = 'none';
    document.getElementById('ttl').style.display = 'none';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}