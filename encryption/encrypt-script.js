/* const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()
 */
/* 
 1. To use this script you need to have 'PRIVATE_KEY' 
    and 'PRIVATE_KEY_PASSWORD' values in .env file.
 2. After encryption, delete your 'PRIVATE_KEY' and
   'PRIVATE_KEY_PASSWORD' variables from .env file.
 3.Don't forget to add '.env' and 'encryptedPK.json' 
   files to '.gitignore' file.
*/
/* async function encrypt() {
    if(!process.env.PRIVATE_KEY || !process.env.PRIVATE_KEY_PASSWORD){
        console.log("Can't start encryption, required pk or pk-password is missing.")
    }
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY)
    // ecnrypt() function returns a json object with encrypted PK
    // which can be decrypted only with the password
    const encryptedJsonKey = await signer.encrypt(process.env.PRIVATE_KEY_PASSWORD)
    console.log("Successful encryption!")
    fs.writeFileSync("./encryption/encryptedPK.json", encryptedJsonKey)
}

encrypt().catch((error) => {
    console.log(error)
    process.exit.code = 1
}) */