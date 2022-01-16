import sha256 from 'sha256';

// block chain constructor function
function BlockChain () {
    this.chain = [];
    this.pendingTransactions = [];

    // create a genesis block
    this.createNewBlock(0, '0000')
}

// blocks that will go into the chain
BlockChain.prototype.createNewBlock = function (nonce,  hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timeStamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash:  this.getLastBlock() && this.getLastBlock().hash ? this.getLastBlock().hash : '0000',
        isValid: hash.substring(0,4) === '0000'
    };
    this.pendingTransactions = []
    this.chain.push(newBlock)
    return newBlock
}
// Returns the last block on the chain
BlockChain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1]
}

// Create a new pending transaction that will be inserted into the chain when a new block is mined.
BlockChain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    }
    this.pendingTransactions.push(newTransaction)
    return this.getLastBlock().index + 1
}

// use sha256 to hash the data
BlockChain.prototype.hashBlock = function (currentBlockData, nonce){
    const dataAsString = this.getLastBlock().hash + nonce.toString() + JSON.stringify(currentBlockData)
    return sha256(dataAsString);
}

// repeat hashing until it finds the correct hash starting in '0000'
BlockChain.prototype.proofOfWork = function (blockData) {
    let nonce = 0
    let hash = this.hashBlock(blockData, nonce)
    while (hash.substring(0,4) !== '0000') {
        nonce++
        hash = this.hashBlock(blockData, nonce)
        console.log(hash)
    }
    return nonce
}



export default BlockChain
