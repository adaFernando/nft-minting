import './Home.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import react, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useWeb3React } from "@web3-react/core"
import { injected, walletconnect, coinbasewallet } from '../../connectors'
import { Modal, Button, ListGroup, ListGroupItem, Overlay, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import CustomModal from '../../components/CustomModal'
import { NotificationManager } from 'react-notifications'
import { useMintContract } from "../../hooks/useContract";
import { ethers, BigNumber } from 'ethers';

import getTokenURI from "../../actions/upload";
import Form from 'react-bootstrap/Form';

import {imageUrls, coverImages, pay_method} from '../../constants'

const items=[{id: 1, name: 'Metamask'}, {id: 2, name: 'WalletConnect'}, {id: 3, name: 'Coinbase'}]
const royalty = "20%"

function Home({miningServers, loading}) {

    const [stateMiningServers, setStateMiningServers] = useState()
    const [ isConnecting, setIsConnecting ] = useState(false)
    const [coverimage, setCoverImage] = useState(null)
    const [step, setStep] = useState(0);
    const [link, setLink] = useState('');
    const mintContract = useMintContract( true )
    const [showModal, setShowModal] = useState(false);

    const { account, activate, deactivate, error, library } = useWeb3React()
    
    const [check, setCheck] = useState(null)

    useEffect(() => {
        setStateMiningServers(miningServers)
        setCheck(miningServers.map(server => {
            // Change server attributes accordingly
            server._v = false;
            return server;
          }));
        console.log("check", check)
    }, [loading, miningServers])
    useEffect(()=> {
        if(account){
            setShowModal(0)
        }
    },[account])
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSave = () => {
      // do something to save changes
      handleClose();
    };

    const [selectedItem, setSelectedItem] = useState({id:0});
    


    const handleItemClick = (item) => {
        setSelectedItem(item);
        // do something with the selected item
    };
    const onclickMetaMaskConnect = async () => {
        setIsConnecting(true)
        try {
            await activate( injected )
        } catch( err ) {
            console.error(err)
        }
        
        setIsConnecting(false)
    }
    const onclickWalletconnect = async() => {
        setIsConnecting(true)
      
        try {
          console.log("wallet connect")
          
          await activate(walletconnect)
        
        } catch( err ) {
            console.error(err)
        }
        
        setIsConnecting(false)
    }
    const onclickCoinBaseConnect = async() => {
        setIsConnecting(true)
      
        try {
          console.log("wallet connect")
          
          await activate(coinbasewallet)
        
        } catch( err ) {
            console.error(err)
        }
        
        setIsConnecting(false)
    }
    const onClickConnectButton = () => {
        if(selectedItem.id == 1){
            onclickMetaMaskConnect()
        }
        else if(selectedItem.id == 2){
            onclickWalletconnect()
        }
        else if(selectedItem.id == 3){
            onclickCoinBaseConnect()
        }
        else {NotificationManager.warning("Select the wallet", "warning")}
    }
    const onClickDisconnectBtn = () => {
        deactivate()
    }
    const onClickGetTokenURIButton = async(miningServer) => {
        if(account){
            const attributes = [{"trait_type": "Email", "value": miningServer.email}, 
            {"trait_type": "Payment", "value": pay_method[miningServer.coinId-1]}, 
            {"trait_type": "Wallet", "value": miningServer.wallet}, 
            {"trait_type": "XCB Wallet", "value": miningServer.xcbAddress}]
            setStep(1)
            let coverImage;
            coverImages.map((image) => {
                if(image.id == miningServer.serverType)
                     coverImage = image
            })
            console.log("coverImage",coverImage )
            console.log("attributes-----------------", attributes)
            const res_upload = await getTokenURI(miningServer.serverType, coverImage.ipfsUrl, attributes);
            if(res_upload.success){
                try {
                    const metadata = res_upload.meta.replace("https://gateway.pinata.cloud/ipfs/", "")

                    console.log("res_upload------------------", res_upload )
                    console.log(mintContract)
                    const tx = await mintContract.mintNFT(miningServer.wallet, metadata)
                    console.log("tx------------------", tx )
                    const res = await tx.wait();
                    setStep(2)
                    console.log("response-------------------------", res)
                    // setLink(res.transactionHash)
                    NotificationManager.success(res.transactionHash, 'Click me', 20000, () => {
                        window.open(`https://goerli.etherscan.io/tx/${res.transactionHash}`, '_blank');
                      }) 
                } catch (error) {
                    setStep(3)
                    console.log(error)
                    NotificationManager.error( "Mint error", 'Something went wrong in mint' )
                }
            }  
            else NotificationManager.error( "Mint error", res_upload.meta )

        }
       else NotificationManager.warning( "Connect to the wallet", 'Warning' )
    }
    const selectServer = (item) => {
        const updatedCheck = [...check];
        updatedCheck.map((uCheck) => {
            if(uCheck._id == item._id){
                uCheck._v = !uCheck._v
            }
            else {
                uCheck._v = false
            }
        })
        setCheck(updatedCheck);
    }
    const onClickApproveBtn = () => {
        let flag = 0
        check.map((c) => {
            if(c._v){
                flag = 1
                miningServers.map((server) => {
                    if(server._id == c._id){
                        onClickGetTokenURIButton(server)
                    }
                })
            }
        })
        if(!flag){
            NotificationManager.warning( "Select an item", 'Warning' )
        }
    }
    return (
        <>
            <h1 className="display-5 text-yellow faq__title mt-3">Easy Admin Dashboard{link}</h1>
            <div className="container mt-5" style={{position: "relative"}}>
                <div className="d-flex mt-5 justify-content-between">
                    {!account ? (
                    <button  className="connect-button" style={{"text-decoration": "none"}} onClick={handleShow}>Connect<span className="hidden_wallet"> to the wallet</span> </button>) : (
                    <button  className="connect-button" style={{"text-decoration": "none"}} onClick={onClickDisconnectBtn}>Disconnect<span className="hidden_wallet"> from the wallet</span> </button>)}
                    <Link to='/faq'>
                        <button  className="change-faq-button" style={{"text-decoration": "none"}}>Change FAQ</button>
                    </Link>
                </div>
            </div>
            {step == 1 ? ( 
                <div className="fade-in d-flex justify-content-center align-items-center" style={{ opacity: 0.8, minHeight: "100vh" }}>
                    <Spinner animation="border" variant="light"></Spinner>
                    <span style={{color: "yellow"}}>Loading...</span>
                    
                </div>)  : (
                    <>
                <Table className="fade-in" responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th><p className='table_header text-red'>IMG</p></th>
                            <th><p className='table_header text-red'>E-mail</p></th>
                            <th><p className='table_header text-red'>Account</p></th>
                            <th><p className='table_header text-red'>XCB Wallet Address</p></th>
                            <th><p className='table_header text-red'>Payment Method</p></th>
                            <th><p className='table_header text-red'>Server Type</p></th>
                        </tr>
                    </thead>
                    <tbody>
                    {stateMiningServers && stateMiningServers.map((miningServer, index) => {
                        return(
                            <tr>
                                <td>
                                    {check && check.map((item) => {
                                        if(item._id == miningServer._id)
                                         return (<input type="checkbox" className='custom-checkbox' checked={item._v} onChange={() => selectServer(item)}/>)
                                    })}
                                </td>
                                <td>{imageUrls.map((url) => {
                                    if(url.id == miningServer.serverType)
                                        return(
                                        <>
                                            <img style={{width: "40px"}} src={url.url}/>                                 
                                        </>)
                                })}</td>
                                <td><p className='text-yellow'>{miningServer.email}</p></td>
                                <td><p className='text-yellow'>{miningServer.wallet}</p></td>
                                <td><p className='text-yellow'>{miningServer.xcbAddress}</p></td>
                                <td><p className='text-yellow'>{pay_method[miningServer.coinId-1]} </p></td>
                                <td><p className='text-yellow'>{miningServer.serverType == 255 ? ('25'): (miningServer.serverType)}</p></td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
                <div className="container mt-5" style={{position: "relative"}}>
                    <div className="d-flex mt-5 justify-content-between">
                        <button  className="change-faq-button" style={{"text-decoration": "none"}} onClick={onClickApproveBtn}>Approve</button>
                    </div>
                </div>   
                </>
                )
            }
            <CustomModal
                title="Choose the wallet"
                show={showModal}
                onHide={handleClose}
                handleSave={handleSave}
                onClickConnectButton={onClickConnectButton}
            >
                <ListGroup >
                    {items.map(item => (
                        <ListGroupItem
                        key={item.id}
                        active={selectedItem && selectedItem.id === item.id}
                        style={{ backgroundColor: '#1e1e1e', color: "red"}}
                        onClick={() => handleItemClick(item)}
                        onDoubleClick={onClickConnectButton}
                        >
                        {item.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </CustomModal>
        </>  
    );
}
  

Home.propTypes = {
    miningServers: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    miningServers: state.miningServerReducer.miningServers,
    loading: state.miningServerReducer.loading,
  });
  
  export default connect(mapStateToProps)(Home);
  
