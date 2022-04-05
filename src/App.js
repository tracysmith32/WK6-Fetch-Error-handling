import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
	const [characters, setCharacters] = useState([]);
	const [error, setError] = useState(null);
	console.log(characters);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await fetch(
					'https://www.breakingbadapi.com/api/characters?limit=10&offset=10',
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				setCharacters(data);
			} catch (err) {
				setError('Could not fetch data');
				console.log(err.message);
			}
		};
		fetchCharacters();
	}, []);

	return (
		<div className="App">
			{error && <p>{error}</p>}
			<div>
				{characters.map((character) => (
					<div key={character.char_id}>
						<h1>{character.name}</h1>
						<h2>{character.birthday}</h2>
						<h3>{character.occupation}</h3>
						<img src={character.img} alt="breaking bad characters"></img>
						<h5>{character.status}</h5>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
