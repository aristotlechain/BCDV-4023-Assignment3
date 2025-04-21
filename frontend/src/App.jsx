import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, Button, Card, Image, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import image from './images/swap.png';

function App() {
	const [storedPrice, setStoredPrice] = useState('');
	const [item, setItem] = useState({ pairs: '' });
	const { pairs } = item;

	const contractAddress = '0x81Ba4F6221a456A9dCCCaC773EdFa5A993D5E6aA';

	const ABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "pair",
					"type": "string"
				}
			],
			"name": "getChainlinkDataFeedLatestAnswer",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

	const provider = new ethers.BrowserProvider(window.ethereum);
	const contract = new ethers.Contract(contractAddress, ABI, provider);

	const getPair = async () => {
		const contractPrice = await contract.getChainlinkDataFeedLatestAnswer(pairs);
		if (pairs === 'BTC/ETH') {
			setStoredPrice(parseInt(contractPrice) / 10 ** 18);
		} else {
			setStoredPrice('$' + parseInt(contractPrice) / 10 ** 8);
		}
	};

	const handleChange = (e) => {
		setStoredPrice('');
		setItem((prevState) => ({
			...prevState,
			pairs: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="app-container">
			<Container className="main-container">
				<div className="header-section">
					<Image
						src={image}
						width={120}
						className="fox-logo"
						alt="Savvy Swap Logo"
					/>
					<h1 className="app-title">Savvy Swap</h1>
					<p className="app-subtitle">Real-time cryptocurrency price checker powered by Chainlink</p>
				</div>

				<Row className="justify-content-center">
					<Col md={8} lg={6}>
						<Card className="price-card">
							<Card.Header className="price-card-header">
								<h3>Select Trading Pair</h3>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<div className="pairs-container">
										{['BTC/USD', 'ETH/USD', 'LINK/USD', 'BTC/ETH'].map((option) => (
											<div
												key={option}
												className={`pair-option ${pairs === option ? 'selected' : ''}`}
												onClick={() => {
													setStoredPrice('');
													setItem({ pairs: option });
												}}
											>
												<Form.Check
													value={option}
													type="radio"
													label={option}
													onChange={handleChange}
													checked={pairs === option}
													id={`pair-${option}`}
													className="pair-radio"
												/>
											</div>
										))}
									</div>
									<div className="action-section">
										<Button
											className="action-button"
											type="submit"
											onClick={getPair}
											disabled={!pairs}
										>
											Get Price
										</Button>
									</div>
								</Form>
							</Card.Body>
						</Card>

						{storedPrice && (
							<Card className="result-card">
								<Card.Body>
									<div className="result-content">
										<div className="result-pair">{pairs}</div>
										<div className="result-arrow">➞</div>
										<div className="result-price">{storedPrice}</div>
									</div>
									<p className="result-timestamp">Last updated: {new Date().toLocaleTimeString()}</p>
								</Card.Body>
							</Card>
						)}
					</Col>
				</Row>

				<footer className="app-footer">
					<p>Savvy Sharma: 101516795</p>
				</footer>
			</Container>
		</div>
	);
}

export default App;