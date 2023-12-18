import { pinJSONToIPFS, pinFileToIPFS } from '../utils/pinata'

export const pinFile = async (file) => {
    if (file == null)
      return;

    let pinataResponse  = await pinFileToIPFS(file)
    if (pinataResponse.success) {
      let url = pinataResponse.pinataUrl
      return {
          value: url,
          status: true
      }
    } else {
        return {
            value: null,
            status: false
        }
    }
}

export const pinJSON = async (metadata) => {
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: "Something went wrong while uploading your tokenURI.",
      };
    } else {
        const tokenURI = pinataResponse.pinataUrl;
        return {
            success: true,
            status: tokenURI
        };
    }
}

export default async function getTokenURI(title, coverimage, attribute) {
        let imageUploaded = await pinFile(coverimage);
        console.log(imageUploaded)
   
        // make metadata
        const metadata = new Object({
            name: title,
            image: coverimage,
            description: "",
            attributes: attribute
        });

        let tokenURI = await pinJSON(metadata);

        return {
            success: true,
            meta: tokenURI.status,
            image: coverimage,
            attribute: attribute
        };
    } 