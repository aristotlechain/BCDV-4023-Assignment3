require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
	solidity: '0.8.19',
	networks: {
		sepolia: {
			url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
			accounts: [METAMASK_PRIVATE_KEY],
		},
	},
};
