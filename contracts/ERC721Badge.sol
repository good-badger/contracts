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
}