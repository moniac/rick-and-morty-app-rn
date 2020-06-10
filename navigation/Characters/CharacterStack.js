import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import CharacterDetailScreen from '../../screens/CharacterDetailScreen';

const Stack = createStackNavigator();

function CharacterStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen
				name='CharacterDetail'
				component={CharacterDetailScreen}
			/>
		</Stack.Navigator>
	);
}

export default CharacterStack;
