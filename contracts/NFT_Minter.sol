// SPDX-License-Identifier: MIT

// Thanks to HashHashLips NFT: https://www.youtube.com/channel/UC1LV4_VQGBJHTJjEWUmy8nA

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract NFTMINTER is ERC721Enumerable, Ownable {
    using Strings for uint256;

    //Events
    event Minted(address indexed _from, uint256 _value);

    //Structs
    struct NFT {
        string title;
        string description;
        string img;
    }

    //Vars
    mapping(uint256 => NFT) public nfts;

    //constructor
    constructor() ERC721("NFT MINTER", "NFTMNT") {}

    // public
    function mint(
        string memory _title,
        string memory _description,
        string memory _img,
        uint256 _mintAmount
    ) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require(msg.value >= (0.069 ether * _mintAmount));
        NFT memory newNFT = NFT(_title, _description, _img);

        for (uint256 i = 1; i <= _mintAmount; i++) {
            nfts[supply + i] = newNFT;
            _safeMint(msg.sender, supply + i);
            emit Minted(msg.sender, supply + i);
        }
    }

    function buildMetadata(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        NFT memory currentNFT = nfts[_tokenId];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                currentNFT.title,
                                '", "description":"',
                                currentNFT.description,
                                '", "image":"ipfs://',
                                currentNFT.img,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return buildMetadata(_tokenId);
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}
