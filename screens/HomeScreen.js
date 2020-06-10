import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { getCharacter } from '../hooks/useApi';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen(props) {
	const [characters, setCharacters] = useState([]);
	const [nextPage, setNextPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(undefined);
	const { navigation } = props;
	console.log(navigation);

	useEffect(() => {
		async function getTest() {
			const response = await getCharacter({ page: 1 });
			setCharacters((prevValues) => [...prevValues, ...response.results]);
			setPageLimit(response.info.pages);
		}
		getTest();
	}, []);

	useEffect(() => {
		if (nextPage > pageLimit) {
			return;
		}
		console.log(nextPage);
		async function getNext() {
			const data = await fetch(
				'https://rickandmortyapi.com/api/character/?page=' + nextPage,
			);
			const response = await data.json();

			const merged = [...characters, ...response.results];
			function removeDuplicates(array, key) {
				let lookup = new Set();
				return array.filter(
					(obj) => !lookup.has(obj[key]) && lookup.add(obj[key]),
				);
			}
			const filtered = removeDuplicates(merged, 'id');
			console.log(filtered);
			setCharacters(filtered);
		}

		getNext();
	}, [nextPage]);

	return (
		<View style={styles.container}>
			<FlatList
				centerContent={true}
				numColumns={1}
				data={characters}
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
