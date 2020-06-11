import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CharacterStack from './Characters/CharacterStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name='Home'
				component={CharacterStack}
				options={{
					title: 'Characters',
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name='md-person' />
					),
				}}
			/>
			<BottomTab.Screen
				name='Links'
				component={LinksScreen}
				options={{
					title: 'Locations',
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name='md-planet' />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName =
		route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
	console.log(route.state);

	switch (routeName) {
		case 'Home':
			return 'Characters';
		case 'Links':
			return 'Locations';
	}
}
