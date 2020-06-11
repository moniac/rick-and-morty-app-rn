import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { getCharacter } from '../hooks/useApi';

export default function CharacterDetailScreen(props) {
	const [character, setCharacter] = useState({});

	const {
		route: { params },
		navigation,
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
				<FlatList
					data={character.episode}
					ListHeaderComponent={<Text>All episode appearances</Text>}
					renderItem={({ item }) => <Text>{item}</Text>}
					keyExtractor={(item) => item}
					style={{
						height: '100%',
						overflow: 'scroll',
						maxHeight: 200,
					}}
					contentContainerStyle={{ overflow: 'scroll' }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa',
		overflow: 'scroll',
		height: '100%',
	},
});
