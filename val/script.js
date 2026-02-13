const keys = document.querySelectorAll('.btn');

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
    if (n == 'DEL') {
        if(x == 1)
            return;
        const tileid = `r${y}t${x - 1}`;
        const tile = document.getElementById(tileid);
        tile.textContent = '';
        x -= 1;
        word = word.substring(0, word.length - 1);
        return;
    } else if (n == 'ENTER') {
        if (x <= 5)
            return;
        compare();
        if (word == answer) {
            console.log('correct');
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