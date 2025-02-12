import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.h1}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    alignItems: 'center',
    },
    h1: {
        fontSize: 20,
    },
});

export default Header;
