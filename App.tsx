import React from 'react';

import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});
function App(): React.JSX.Element {
  const {theme} = useTheme();
  return (
    <View style={style.container}>
      <ThemeProvider>
        <NavigationContainer theme={theme}>
          <AppNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </View>
  );
}

export default App;
