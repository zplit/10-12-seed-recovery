var Mnemonic = require('bitcore-mnemonic');
const { ethers } = require("ethers");
var bip39 = require('bip39');
const fs = require("fs");
const { HDNode } = require('ethers/lib/utils');

var split = ''; // Input 10 seed phase (missing last 2)
var intentos = Mnemonic.Words.ENGLISH.length // Number of words in wordlist

for (let index = 0; index < intentos; index++) {
    let comb1 = split + Mnemonic.Words.ENGLISH[index]; // add 1st word missing
    for (let index = 0; index < intentos; index++) {
        let comb2 = comb1 + Mnemonic.Words.ENGLISH[index]; // add 2nd word missing
        let valida = bip39.validateMnemonic(comb2);
        if (valida) {
        console.log(comb2);
        var cartera = HDNode.fromMnemonic(comb2);
        console.log(cartera.address);
        if (cartera.address=="0x261ac0e538dD5f0d990ccc45B7837D68c2532752") {
            console.log("FOUND PK");
            console.log(cartera.privateKey);
            fs.writeFileSync('./pk.txt', cartera.privateKey, 'utf8', (err) => {

                if (err) {
                    console.log(`Error writing file: ${err}`);
                } else {
                    console.log(`Private key written on txt file`);
                }
            });
        }
    }
}};


