import { useMemo } from 'react'
import { useActiveWeb3React } from ".";
import { contract_address, goerliNetworkChainId } from "../constants"

import ABI from '../constants/nftcontract.json';
import { getContract } from "../utils";

// returns null on errors
export function useContract(address, ABI, withSignerIfPossible = true) {
    const { library, account } = useActiveWeb3React()
    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            console.log("step2")
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMintContract( withSignerIfPossible ) {
    return useContract(contract_address[goerliNetworkChainId], ABI, withSignerIfPossible)
}
