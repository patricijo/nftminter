// SPDX-License-Identifier: MIT

// Thanks to HashHashLips NFT: https://www.youtube.com/channel/UC1LV4_VQGBJHTJjEWUmy8nA

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract NFTMINTER is ERC721Enumerable, Ownable {
    using Strings for uint256;

    struct NFT {
        string title;
        string description;
        string img;
    }

    mapping(uint256 => NFT) public nfts;

    constructor() ERC721("NFT MINTER", "NFTMNT") {}

    // public
    function mint(
        string memory _title,
        string memory _description,
        string memory _img
    ) public payable returns (uint256) {
        uint256 supply = totalSupply();
        require(supply + 1 <= 1000);

        NFT memory newNFT = NFT(_title, _description, _img);

        if (msg.sender != owner()) {
            // require(msg.value >= 0.005 ether);
        }

        nfts[supply + 1] = newNFT;
        _safeMint(msg.sender, supply + 1);

        return uint256(supply + 1);
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
                                '", "image": ipfs://"',
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
