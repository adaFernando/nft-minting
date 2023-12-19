import { BigNumber } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { useActiveWeb3React } from "."
import { ChainId, avatar_contractAddress, mainNetworkChainId } from "../constants"
import { formatFromBalance } from "../utils"
import { useTransactionAdder } from "./store/transactions"
import { useMintContract } from "./useContract"
import { whiteList } from "../constants/whitelist"
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'

const useMintNFT = (props) => {
    const { account, chainId } = useActiveWeb3React()
    const mintContract = useMintContract( true )

    const [ totalSupply, setTotalSupply ] = useState(0)
    const [ maxSupply, setMaxSupply ] = useState(10000)
    const [presaleStatus, setPresaleStatus] = useState(false)
    const [publicsaleStatus, setPublicsaleStatus] = useState(false)
    const [presalePrice, setPresalePrice] = useState( BigNumber.from('0x11c37937e08000') ) // 0.005 ether as presale price
    const [publicsalePrice, setPublicSalePrice] = useState( BigNumber.from('0x18de76816d8000') ) // 0.007 ether as publicsale price

    const whitelistAddresses = whiteList.map((addr) => {
        return addr.toLowerCase()
    })

    const addTransaction = useTransactionAdder()

    const fetchMintInfo = useCallback(async () => {
        if( mintContract ) {
            try {
                const result = await mintContract?.totalSupply()
                setTotalSupply( Number( formatFromBalance( result, 0 ) ) )
    
                const result_maxSupply = await mintContract?.MAX_SUPPLY()
                setMaxSupply( Number( formatFromBalance( result_maxSupply, 0 ) ) )
    
                const presale_status = await mintContract?.isPreSaleActive()
                setPresaleStatus(presale_status)

                const publicsale_status = await mintContract?.isPublicSaleActive()
                setPublicsaleStatus(publicsale_status)

                const presale_price = await mintContract?.PRESALE_PRICE()
                setPresalePrice(BigNumber.from(presale_price))

                const public_price = await mintContract?.PUBLIC_PRICE()
                setPublicSalePrice(BigNumber.from(public_price))
            } catch(e) {
                console.error('fetchMintInfo ------ : ', e)
            }
        } else {

            // setTotalSupply( ethNFTs.total )
        }
    }, [ mintContract, account, chainId ])

    useEffect(() => {
        fetchMintInfo()

        const refreshInterval = setInterval(fetchMintInfo, 10000)
        return () => clearInterval(refreshInterval)
    }, [mintContract, account, chainId])

    const mint = useCallback(
        async ( input ) => {
            const isPulicsale = await mintContract?.isPublicSaleActive()
            const isPresale = await mintContract?.isPreSaleActive()

            if (isPulicsale) {
                try {
                    const tx = await mintContract?.mint( input.mintAmount, {
                        value: input.value
                    } )
                    addTransaction(tx, { summary: `Mint succeed!` })
                    return { result: true, status: tx }
                } catch(e) {
                    console.error('mint -------', e)
                    return { result: false, status: e }
                }
            } else if (isPresale) {
                let index = whitelistAddresses.indexOf(account.toLowerCase())

                let hexProof
                const leafNodes = whiteList.map((addr) => keccak256(addr).toString('hex'))
                const merkleTree = new MerkleTree(leafNodes, keccak256, {
                  sortPairs: true,
                })
                const rootHash = merkleTree.getRoot();
                console.log("---roothash---", rootHash)
                console.log("RootHash: ", rootHash.toString("hex"));
                console.log("MerkleTree: ", merkleTree.toString());

                console.log(
                    merkleTree.verify(
                      hexProof,
                      keccak256("").toString("hex"),
                      rootHash
                    )
                );
                
                if (index === -1) {
                    return { result: false, status: "You are not whitelisted." }
                } else {
                    hexProof = merkleTree.getHexProof(leafNodes[index])
                    console.log(hexProof)
                }

                try {
                    const tx = await mintContract?.preSaleMint( hexProof, input.mintAmount, {
                        from: account,
                        value: input.value
                    } )
                    addTransaction(tx, { summary: `Mint succeed!` })
                    return { result: true, status: tx }
                } catch(err) {
                    console.error('mint -------', err)
                    return { result: false, status: err }
                }
            }
        },
        [ mintContract ]
    )

    return { totalSupply, maxSupply, presaleStatus, publicsaleStatus, presalePrice, publicsalePrice, mint }
}

export default useMintNFT