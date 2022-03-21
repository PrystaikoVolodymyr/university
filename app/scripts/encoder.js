const {alphabet} = require('../data/alphabet.json');

let p = 5// велике число
let q = 17// велике число

let n = p * q;

let f = (p - 1) * (q - 1);


let d;// d i f взаємно прості

for (let i = 2; i < f; i++) {
    let m = 0;
    for (let j = 2; j <= i; j++) {
        if (i % j === f % j) {
            m++;
        }
    }
    if (m === 0) {
        d = i;
        break;
    }
}
let e;
for (let i = 1; ;i++) {
    if ((i * d) % f === 1 && i !== d) {
        e = i;
        break;
    }
}
// console.log('p =', p);
// console.log('q =', q);
// console.log('n =', n);
// console.log('f =', f);
// console.log('d =', d);
// console.log('e =', e);
// console.log('ВІДКРИТИЙ КЛЮЧ', e, 'i', n);
// console.log('ЗАКРИТИЙ КЛЮЧ', d, 'i', n);

module.exports = {
     encryption(message) {
        let coder = [];

        message = message.split('');

        for (let letter of message) {
            let с;
            if (alphabet.includes(letter)) {
               let i = alphabet.indexOf(letter)
                с = (i ** d) % n;
                coder.push(с);
            }else {
                coder.push(letter)
            }
        }

        let encrypted = [];

        for (const coderElement of coder) {
            if (typeof coderElement === "number") {
                encrypted.push(alphabet[coderElement])
            } else {
                encrypted.push(coderElement)
            }
        }
        return encrypted.join('');

    },

     decryption(message) {
        let decrypted = [];
        let coder = [];

        message = message.split('');

        for (let letter of message) {
            if (alphabet.includes(letter)) {
                coder.push(alphabet.indexOf(letter));
            }else {
                coder.push(letter)
            }
        }

        for (const coderElement of coder) {
            let m;
            if (typeof coderElement === "number") {
                const z = (BigInt(coderElement) ** BigInt(e));
                m = BigInt(z) % BigInt(n);
                decrypted.push(alphabet[m]);
            } else {
                decrypted.push(coderElement);
            }

        }

        return decrypted.join('')
    }
}
