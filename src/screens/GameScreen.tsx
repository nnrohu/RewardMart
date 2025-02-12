import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const GameScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Game Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default GameScreen;
