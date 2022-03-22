
let p = 19
let q = 73

let n = p * q;

let f = (p - 1) * (q - 1);


let d;

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
      async encryption(message) {
        let coder = [];

        message = message.split('');

        for (let letter of message) {
            let с;
            let i = letter.charCodeAt()
                с = (i ** d) % n;
                coder.push(с);
        }
        let encrypted = coder.join(' ');

        return encrypted

    },

      async decryption(message) {
         let decrypted = [];

         let coder = message.split(' ');
         const pusher = async function (letter) {
             decrypted.push(letter);
         }
        for (const coderElement of coder) {
                let m;
                const z = (BigInt(+coderElement) ** BigInt(e));
                m = BigInt(z) % BigInt(n);
            const letter = String.fromCharCode(Number(m))

            await pusher(letter)

        }

         return decrypted.join('')
     }
}
