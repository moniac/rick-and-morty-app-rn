import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
	Image,
	StyleSheet,
	TextInput,
	View,
	FlatList,
	Button,
} from 'react-native';
import { getCharacter } from '../hooks/useApi';

export default function HomeScreen(props) {
	const [characters, setCharacters] = useState([]);
	const [nextPage, setNextPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(undefined);
	const { navigation } = props;

	const [search, setSearch] = useState(undefined);

	useEffect(() => {
		console.log(search);
		if (!search) {
			setCharacters([]);
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
					<TextInput
						onChangeText={(event) => setSearch(event.trim())}
					/>
				}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
				}}
				renderItem={({ item }) => (
					<View>
						<View>
							<Image
								style={{
									width: 300,
									height: 300,
									marginTop: 12,
								}}
								resizeMode={'cover'}
								source={{ uri: item.image }}
							/>
						</View>

						<View>
							<Button
								title={item.name}
								onPress={() =>
									navigation.navigate('CharacterDetail', {
										characterId: item.id,
										title: item.name,
									})
								}
							/>
						</View>
					</View>
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
	},
});
