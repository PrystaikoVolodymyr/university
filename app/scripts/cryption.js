let alphabet = [
    '',
    'а',
    'б',
    'в',
    'г',
    'ґ',
    'д',
    'е',
    'є',
    'ж',
    'з',
    'и',
    'і',
    'й',
    'ї',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ь',
    'ю',
    'я',
    ' ',
];

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
console.log('p =', p);
console.log('q =', q);
console.log('n =', n);
console.log('f =', f);
console.log('d =', d);
console.log('e =', e);
console.log('ВІДКРИТИЙ КЛЮЧ', e, 'i', n);
console.log('ЗАКРИТИЙ КЛЮЧ', d, 'i', n);

let word = 'Володимир Пристайко Привіт мене звати вова';
word = word.toLowerCase().split('');

// encryption
let coder = [];

for (let letter of word) {
    let с;
    for (let i = 0; i < alphabet.length; i++) {
        if (letter === alphabet[i]) {
            console.log(letter, i);
            с = (i ** d) % n;
            coder.push(с);
        }
    }
}

console.log('encrypted', coder);
let encrypted = [];

for (const coderElement of coder) {
    for (let i = 0; i < alphabet.length; i++) {
        if (coderElement === i) {
            encrypted.push(alphabet[i]);
            console.log(i, alphabet[i]);
        } if (coderElement > alphabet.length && coderElement - alphabet.length === i) {
            encrypted.push(alphabet[i]);
            console.log(alphabet[i], i);
        }
    }
}
console.log('encrypted', encrypted.join(''));

// decryption
let decrypted = [];
for (const coderElement of coder) {
    let m;
    const z = (BigInt(coderElement) ** BigInt(e));
    m = BigInt(z) % BigInt(n);
    // console.log(m+ + alphabet[m])
    decrypted.push(alphabet[m]);
}
console.log('decrypted', decrypted.join(''));
