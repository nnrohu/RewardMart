import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({title, showBack = false, onBack}) => {
  const navigation = useNavigation();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Icon name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.h1}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  h1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    zIndex: 1,
  },
});

export default Header;
