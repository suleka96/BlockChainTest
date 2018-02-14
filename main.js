const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timeStamp,data,previouseHash = ''){
        this.index=index;
        this.data=data;
        this.timeStamp=timeStamp;
        this.previouseHash = previouseHash;
        this.hash = calculateHash();
    }

    calculateHash(){
        return SHA256(this.index+this.previouseHash+this.timeStamp+JSON.stringify(this.data)).toString();
    }
}


