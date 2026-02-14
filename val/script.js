const keys = document.querySelectorAll('.btn');
const tiles = document.querySelectorAll('.front');
const cards = document.querySelectorAll('.card');
const nobtn = document.getElementById('no');
const yesbtn = document.getElementById('yes');

let bscolors = ['0 4px 0 #a81818', '0 4px 0 #a86e18', '0 4px 0 #a89e18', '0 4px 0 #18a843',
              '0 4px 0 #1832a8', '0 4px 0 #8618a8', '0 4px 0 #a8189c'];
let colors = ['#ff2323', '#ffa724', '#fff025', '#27ff68', '#244cff', '#cc25ff', '#ff24ed'];
let x = 1;
let y = 1;
let letter = '';
let word = '';
let answer = 'LOVEU';
let clicks = 1;

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
            document.getElementById('btn1').style.display = 'flex';
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
        let tileid = `r${y}t${i + 1}t`;
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
    document.getElementById('btn1').style.display = 'none';
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
        tile.textContent = ' ';
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
    document.querySelectorAll('.back').forEach((back, index) => {
        back.style.boxShadow = bscolors[Math.floor(index / 5)];
        back.style.background = colors[Math.floor(index / 5)];
    });
    cards.forEach((card, index) => {
        setTimeout(() => {
            if(card.id == 'message')
                return;
            card.classList.toggle("flip");
        }, index * 150);
    });
    document.querySelector('.bg-layer').classList.add("active");
    await sleep(4000);
    document.getElementById('btn2').style.display = 'flex';
}

nobtn.addEventListener('click', () => {
    const top = Math.floor(Math.random() * (80 - 20 + 1) + 20);
    const right = Math.floor(Math.random() * (80 - 20 + 1) + 20);
    nobtn.style.position = 'absolute';
    nobtn.style.top =  `${top}%`;
    nobtn.style.right = `${right}%`;
    nobtn.style.transform = `scale(${.75 - (clicks * .10)})`;
    yesbtn.style.transform = `scale(${1.25 + (clicks * .10)})`;
    clicks++;
});

yesbtn.addEventListener('click', async () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            if (card.id == 'message')
                return;
            card.classList.add("animate");
        }, index * 50); 
    });
    document.getElementById('btn2').style.display = 'none';
    await sleep(4000);
    document.getElementById('boxes').style.display = 'none';
    document.getElementById('mcard').style.display = 'flex';
    document.getElementById('btn3').style.display = 'flex';
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelectorAll('.message').forEach(msg => {
    msg.addEventListener('click', () => {
        msg.classList.toggle("flip");
    });
});

document.getElementById('open').addEventListener('click', () => {
    document.getElementById('popup-box').style.display = 'flex';
});

document.getElementById('popup-box').addEventListener('click', () => {
    document.getElementById('popup-box').style.display = 'none';
});
