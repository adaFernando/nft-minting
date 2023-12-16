// import logo from './logo.svg';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useWeb3React } from "@web3-react/core"

import Banner from '../Components/Banner';
import CardOneSection from '../Components/CardOneSection';
import CardsSection from '../Components/CardsSection'
import LimitSection from '../Components/LimitSection';
import Ourpartner from '../Components/Ourpartner';
import Footer from "../Components/Footer";
import ConnectWalletModal from '../Components/ConnectWalletModal';
import BuyModal from '../Components/BuyModal';

function Home() {
  
    const [buyCase, setBuyCase] = useState(null);
    

    return (
        <div  class="home__body" style={{"background-image": "url('/assets/images/grids.png')", "background-size": "100%", "background-position": "center"}}>
            <Banner />
            <CardOneSection setBuyCase={setBuyCase}/>
            <CardsSection setBuyCase={setBuyCase}/>
            <LimitSection setBuyCase={setBuyCase}/>
            <Ourpartner />
            <Footer />
            <ConnectWalletModal />
            <BuyModal buyCase={buyCase}/>
        </div>
    );
}

export default Home;
