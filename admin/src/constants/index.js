export const ChainId = {
    MAINNET : 1,
    ROPSTEN : 3,
    RINKEBY : 4,
    GOERLI : 5,
    KOVAN : 42,
    MATIC : 137,
    MATIC_TESTNET : 80001,
    FANTOM : 250,
    FANTOM_TESTNET : 4002,
    XDAI : 100,
    BSC : 56,
    BSC_TESTNET : 97,
    ARBITRUM : 79377087078960,
    MOONBASE : 1287,
    AVALANCHE : 43114,
    FUJI : 43113,
    HECO : 128,
    HECO_TESTNET : 256,
    HARMONY : 1666600000,
    HARMONY_TESTNET : 1666700000
}

export const contract_address = {
    [ ChainId['MAINNET'] ]: '',
    // [ ChainId['GOERLI'] ]: '',
    [ ChainId['GOERLI'] ]: ''

}

export const mainNetworkChainId = ChainId.MAINNET
export const goerliNetworkChainId = ChainId.GOERLI

export const NetworkContextName = 'NETWORK'

export const ErrorMessages = {
    '-32002': 'Already processing Metamask wallet connect. Please confirm metamask modal.'
}

export const MoralisAPIKey = {
    serverUrl: "https://ygogtpuez79s.usemoralis.com:2053/server",
    appId: "6STWJ8AyIqe5s56zzLmNyCvriXZeIW2Pr44Jb5bI",
    apiKey: "2kHumt68e3WgGgwT82mkFVMMmlpfnf3Mzi7KWXWnyHrO8lJqpV5aZeAiFts3yYzM"    
}
export const imageUrls = [
    {id:"255", url: "/assets/images/card0.png"}, 
    {id:"25", url: "/assets/images/card1.png"},
    {id:"50", url: "/assets/images/card2.png"}, 
    {id:"75", url: "/assets/images/card3.png"},
    {id:"100", url: "/assets/images/card5.png"},
    {id:"125", url: "/assets/images/card6.png"},
    {id:"150", url: "/assets/images/card7.png"},
    {id:"200", url: "/assets/images/limit-card1.png"},
    {id:"500", url: "/assets/images/limit-card2.png"},
]

export const coverImages = [
    {id:"255", ipfsUrl: "https://ipfs.io/ipfs/QmcTb4GvUJ4QixCFiwZ3Y3PiZ82XEezWVH3dtbENhr9mdj"},
    {id:"25", ipfsUrl: "https://ipfs.io/ipfs/QmRoGeBxZEKk8cVEjsaw9j149eW6jQprrEpfoUkZtRQaYp"},
    {id:"50", ipfsUrl: "https://ipfs.io/ipfs/QmQvr8dpXBBJWw8hD5M715QsLCUihRxvLCaAvXwJc1iv5f"},
    {id:"75", ipfsUrl: "https://ipfs.io/ipfs/QmYRZ9SeHRnEnEdFug5vWAiiCEFmnafigmoqgZTzMuF5x2"},
    {id:"100", ipfsUrl: "https://ipfs.io/ipfs/Qmc7VtGuDqjECwTViKQC8i3t4xzonbsLazN6EP6QjLwDVW"},
    {id:"125", ipfsUrl: "https://ipfs.io/ipfs/Qmdu9EFa8np8GmQaMfhZTgFY3qRjQunNh5h3SexUVUW6G2"},
    {id:"150", ipfsUrl: "https://ipfs.io/ipfs/QmWKYPJeCNKbi6uig81iNTWSkPNfMnHYxNwdbN6WnarwRH"},
    {id:"200", ipfsUrl: "https://ipfs.io/ipfs/QmcC8iVFhibKL3b1KkMgijwYojtcxP5wewtDVfcp1QJJLU"},
    {id:"500", ipfsUrl: "https://ipfs.io/ipfs/QmUQribUsLy4ciFgSQpXgLk5aVFcZJ4C3DXwY3PfBzTmi2"},
]

export const pay_method = ["Stripe", "BTC", "USDT" , "AVAX", "BNB" ,"ETH", "SOL", "DOGE", "TRX", "XMR", "USDC", "MATIC"]