pragma solidity ^0.4.23;

import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract ERC721Badge is ERC721Token {
    address  internal issuer_;
    //string  internal receiver_;
    string  internal date_;
    string  internal description_;
    string  internal artwork_;
    //string  internal proof_;

    // Mapping for token issuers
    mapping(uint256 => address) internal issuers;

    // Mapping for token dates
    mapping(uint256 => string) internal dates;

    // Mapping for token artworks
    mapping(uint256 => string) internal artworks;

    constructor (string _name, string _symbol) public
        ERC721Token(_name, _symbol)
    {
    }

    /**
    * Custom accessor to create a unique token
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        address _issuer, 
        string _date, 
        string _description, 
        string _artwork
    ) public
    {
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _description);
        issuers[_tokenId] = _issuer;
        dates[_tokenId] = _date;
        artworks[_tokenId] = _artwork;
    }

    /**
    * @dev Gets the artwork for a token ID, or zero if no date set
    * @param _tokenId uint256 ID of the token to query the approval of
    * @return string representing the artwork for the given token ID
    */
    function getArtwork(uint256 _tokenId) public view returns (string) {
        return artworks[_tokenId];
    }

    /**
    * @dev Gets the description for a token ID, or zero if no artwork set
    * @param _tokenId uint256 ID of the token to query the approval of
    * @return string representing the description for the given token ID
    */
    function getDescription(uint256 _tokenId) public view returns (string) {
        return super.tokenURI(_tokenId);
    }

    /**
    * @dev Gets the date for a token ID, or zero if no date set
    * @param _tokenId uint256 ID of the token to query the approval of
    * @return string representing the date of issue for the given token ID
    */
    function getDate(uint256 _tokenId) public view returns (string) {
        return dates[_tokenId];
    }

    /**
    * @dev Gets the issuer for a token ID, or zero if no date set
    * @param _tokenId uint256 ID of the token to query the approval of
    * @return string representing the issuer for the given token ID
    */
    function getIssuer(uint256 _tokenId) public view returns (address) {
        return issuers[_tokenId];
    }

}