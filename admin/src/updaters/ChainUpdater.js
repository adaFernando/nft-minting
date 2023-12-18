import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import { goerliNetworkChainId, mainNetworkChainId } from '../constants';

export default function Updater() {
    const { active, library, chainId } = useWeb3React()

    const switchNetwork = useCallback(async () => {
        await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: '0x' + goerliNetworkChainId.toString(16) }],
        });
    }, [library, chainId])

    useEffect(() => {
        if( active && chainId !== goerliNetworkChainId ) {
           switchNetwork() 
        }
    }, [library, chainId, active])

    return null
}
