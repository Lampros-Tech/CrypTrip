// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
/// @title NFT Contract (ERC721 compliant)
/// @author Manav Vagdoda (Lampros Tech)
import “@openzeppelin/contracts/token/ERC721/ERC721.sol”;
import “@openzeppelin/contracts/access/Ownable.sol”;
import “@openzeppelin/contracts/utils/Counters.sol”;
import “@openzeppelin/contracts/token/ERC721/ERC721.sol”;
import “@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol”;
import “@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol”;
contract NFT1 is ERC721, Ownable, ERC721URIStorage, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;
    address contractOwner;
    constructor() ERC721(“CrypTrip Token”, “CTT”) {
      contractOwner = msg.sender;
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    string baseExtension = “.json”;
    function uint2strk(uint256 _i) internal pure returns (string memory str) {
      if (_i == 0)
      {
        return “0";
      }
      uint256 j = _i;
      uint256 length;
      while (j != 0)
      {
        length++;
        j /= 10;
      }
      bytes memory bstr = new bytes(length);
      uint256 k = length;
      j = _i;
      while (j != 0)
      {
        bstr[--k] = bytes1(uint8(48 + j % 10));
        j /= 10;
      }
      str = string(bstr);
    }
    function safeMint(address _receiver, string memory _tierURI) public {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(_receiver, tokenId);
        string memory finalURI = uint2strk(tokenId);
        finalURI = string(abi.encodePacked(_tierURI, finalURI, baseExtension));
        _setTokenURI(tokenId, finalURI);
    }
    
}