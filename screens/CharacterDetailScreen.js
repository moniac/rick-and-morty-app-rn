import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { getCharacter } from '../hooks/useApi';

export default function CharacterDetailScreen(props) {
	const [character, setCharacter] = useState({});
	const {
		route: { params },
	} = props;
	const { characterId } = params;

	useEffect(() => {
		async function fetchCharacter() {
			const response = await getCharacter(characterId);
			console.log(response);
			setCharacter(response);
		}

		fetchCharacter();
	}, []);

	if (!character) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: character.image }}
				style={{
					width: '100%',
					height: 300,
					marginTop: 12,
				}}
				resizeMode={'contain'}
			/>
			<View style={{ width: '100%', alignItems: 'center' }}>
				<Text>
					{character.name} - {character.gender} - {character.species}
				</Text>
				<Text>{character?.location?.name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
});
