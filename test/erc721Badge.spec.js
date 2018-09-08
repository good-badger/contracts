var chai = require('chai');
var chaiAsPromised  = require('chai-as-promised');
chai.use(chaiAsPromised)
const { expect, assert } = chai

var ERC721Badge = artifacts.require("ERC721Badge");

contract('Testing ERC721 Badge contract', function(accounts) {

    let token;
    const name = "SDG Badge";
    const symbol = "BDG"

    const account1 = accounts[1]
    const tokenId1 = 11111;
    const issuer1 = accounts[0];
    const date1 = "7 September 2018"
    const description1 = "description1";
    const artwork1 = "000000000";

    const account2 = accounts[2]
    const tokenId2 = 22222;
    const issuer2 = accounts[0];
    const date2 = "7 September 2018"
    const description2 = "description1";
    const artwork2 = "000000000";

    const account3 = accounts[3]
    const tokenId3 = 33333;
    const issuer3 = accounts[0];
    const date3 = "7 September 2018"
    const description3 = "description1";
    const artwork3 = "000000000";

    it(' should be able to deploy and mint ERC721 token', async () => {
        token = await ERC721Badge.new(name, symbol)
        await token.mintUniqueTokenTo(account1, tokenId1, issuer1, date1, description1, artwork1, {from: accounts[0]})

        expect(await token.symbol()).to.equal(symbol)
        expect(await token.name()).to.equal(name)
    })

    it(' should be unique', async () => {
        const duplicateTokenID = token.mintUniqueTokenTo(account2, tokenId1, issuer2, date2, description2, artwork2, {from: accounts[0]}) //tokenId
        expect(duplicateTokenID).to.be.rejectedWith(/VM Exception while processing transaction: revert/)
    })

    it(' should allow creation of multiple unique tokens and manage ownership', async () => {
        const additionalToken = await token.mintUniqueTokenTo(account2, tokenId2, issuer2, date2, description2, artwork2, {from: accounts[0]})
        const additionalToken2 = await token.mintUniqueTokenTo(account2, tokenId3, issuer3, date3, description3, artwork3, {from: accounts[0]})
        expect(Number(await token.totalSupply())).to.equal(3)

        expect(await token.exists(tokenId1)).to.be.true
        expect(await token.exists(tokenId2)).to.be.true
        expect(await token.exists(9999)).to.be.false // Dummy tokenId

        expect(await token.ownerOf(tokenId1)).to.equal(account1)
        expect(await token.ownerOf(tokenId2)).to.equal(account2)
        expect(await token.ownerOf(tokenId3)).to.equal(account2)
    })

    it(' should allow safe transfers', async () => {
        const unownedTokenId = token.safeTransferFrom(account2, account3, tokenId1, {from: accounts[2]}) // tokenId
        expect(unownedTokenId).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        const wrongOwner = token.safeTransferFrom(account1, account3, tokenId2, {from: accounts[1]}) // wrong owner
        expect(wrongOwner).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        // Noticed that the from gas param needs to be the token owners or it fails
        const wrongFromGas = token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[1]}) // wrong owner
        expect(wrongFromGas).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        await token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[2]})
        expect(await token.ownerOf(tokenId2)).to.equal(account3)
    })
})