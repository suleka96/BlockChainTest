const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timeStamp,data,previousHash = ''){
        this.index=index;
        this.data=data;
        this.timeStamp=timeStamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timeStamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [];
        this.createGenesisBlock();
        this.chain.push(newBlock);
    }

    createGenesisBlock(){
        var date = new Date();
        return new Block(0,date,"Genesis Block","0");
    }

    getLatestBlock(){
        this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash= newBlock.calculateHash();
        this.chain.push(newBlock);
               
    }

    isChainsValid(){
        for(let i=1;i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true
    }
}

let coin = new Blockchain();
var date = new Date();
coin.addBlock(new Block(1,date,{amount: 4}));
date = new Date();
coin.addBlock(new Block(2,date,{amount: 10}));

console.log("Is chain valid? "+coin.isChainsValid());

console.log(JSON.stringify(coin,null, 4));

