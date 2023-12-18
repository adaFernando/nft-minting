import axios from 'axios';

const key = "aa8f727990c7ad9004f1"
const secret = "8cd0ee5e21ee6a815951ec377655bae5a7003de91a18b0f20f7042881352a045"
 
export const pinFileToIPFS = (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    
    let formData = new FormData();
    formData.append('file', file);

    return axios.post(url,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
                'pinata_api_key': key,
                'pinata_secret_api_key': secret
            }
        }
    ).then(function (response) {
        //handle response here
        console.log(response)
        return {
            success: true,
            pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        }
    }).catch(function (error) {
        //handle error here
        console.log(error)
        return {
            success: false,
            message: error.message,
        }
    });
};

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
    });
};