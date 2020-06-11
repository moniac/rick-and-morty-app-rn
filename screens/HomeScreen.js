import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
	Image,
	StyleSheet,
	View,
	FlatList,
	// Button
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getCharacter } from '../hooks/useApi';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function HomeScreen(props) {
	const [characters, setCharacters] = useState([]);
	const [nextPage, setNextPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(undefined);
	const { navigation } = props;

	const [search, setSearch] = useState('');

	useEffect(() => {
		console.log(search);

		if (nextPage > 1) {
			setNextPage(1);
		}

		async function getCharacterBySearch() {
			const response = await getCharacter({ name: search });
			setCharacters(response.results);
			console.log(response.results);
		}

		getCharacterBySearch();
	}, [search]);

	useEffect(() => {
		async function getTest() {
			const response = await getCharacter({ page: 1 });
			setCharacters((prevValues) => response.results);
			setPageLimit(response.info.pages);
		}
		getTest();
	}, []);

	useEffect(() => {
		if (nextPage > pageLimit) {
			return;
		}

		async function getNext() {
			const data = await fetch(
				'https://rickandmortyapi.com/api/character/?page=' + nextPage,
			);
			const response = await data.json();

			const merged = [...characters, ...response.results];
			// function removeDuplicates(array, key) {
			// 	let lookup = new Set();
			// 	return array.filter(
			// 		(obj) => !lookup.has(obj[key]) && lookup.add(obj[key]),
			// 	);
			// }
			// const filtered = removeDuplicates(merged, 'id');

			setCharacters(merged);
		}

		getNext();
	}, [nextPage]);

	return (
		<View style={styles.container}>
			<FlatList
				centerContent={true}
				numColumns={1}
				data={characters}
				ListHeaderComponent={
					<View style={{ width: '100%' }}>
						<TextInput
							style={{ width: 300, flex: 1 }}
							onChangeText={(event) => setSearch(event.trim())}
						/>
					</View>
				}
				ListHeaderComponentStyle={{ width: '100%' }}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					width: '100%',
				}}
				style={{ width: '100%' }}
				renderItem={({ item }) => (
					<Card>
						<View>
							<Card.Cover
								style={{
									width: 300,
									height: 300,
									paddingTop: 12,
								}}
								source={{ uri: item.image }}
							/>
						</View>
						<Card.Content>
							<Card.Title title={item.name} />
							<Card.Actions>
								<Button
									onPress={() =>
										navigation.navigate('CharacterDetail', {
											characterId: item.id,
											title: item.name,
										})
									}
								>
									Visit
								</Button>
							</Card.Actions>
						</Card.Content>
					</Card>
				)}
				keyExtractor={(char) => `${char.id} - ${char.name}`}
				onEndReached={() => {
					if (nextPage) {
						console.log('times');
						console.log(nextPage + 1);
						setNextPage((v) => parseInt(v + 1, 10));
					}
				}}
				onEndReachedThreshold={0.1}
			/>
			{/* <View style={styles.getStartedContainer}>
					{characters.length &&
						characters.map((char) => {
							return <p>{char.name}</p>;
						})}
				</View> */}
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
});
