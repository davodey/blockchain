// const BlockChain = require('./blockchain.js')
import BlockChain from './blockchain.js'
const bitcoin = new BlockChain ();


const currentBlockData = [
    {
        amount: 300,
        sender: 'dave',
        recipient: 'allison'
    },
    {
        amount: 400,
        sender: 'dave',
        recipient: 'allison'
    },
    {
        amount: 500,
        sender: 'dave',
        recipient: 'allison'
    }
]

console.log(bitcoin)




