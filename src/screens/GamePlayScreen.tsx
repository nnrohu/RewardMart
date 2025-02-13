import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Animated, Image
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setCurrentScore, setDiscountCode } from '../store/gameSlice';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
const GRID_SIZE = 4;
const CARD_SIZE = (width - 64) / GRID_SIZE;

// Define the Card type
interface Card {
  id: number;
  image: any;
  isFlipped: boolean;
  isMatched: boolean;
  animatedValue: Animated.Value;
}

const IMAGES = [
  require('../assets/discount_10.webp'),
  require('../assets/discount_20.webp'),
  require('../assets/discount_30.webp'),
  require('../assets/discount_10.webp'),
  require('../assets/discount_20.webp'),
  require('../assets/discount_30.webp'),
];

const GamePlayScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  console.log('GamePlayScreen mounted');
  const dispatch = useDispatch();
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const initializeGame = useCallback(() => {
    const shuffledImages = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
        animatedValue: new Animated.Value(0),
      }));
    setCards(shuffledImages);
    setSelectedCards([]);
    setMoves(0);
    setGameStarted(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      setMoves(prev => prev + 1);

      if (first.image === second.image) {
        setCards(prevCards =>
          prevCards.map(card => card.image === first.image ? { ...card, isMatched: true } : card)
        );
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          selectedCards.forEach(card => flipCard(card, false));
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (cards.every(card => card.isMatched) && gameStarted) {
      endGame();
    }
  }, [cards, gameStarted]);

  const flipCard = (card: Card, flipToFront: boolean) => {
    Animated.timing(card.animatedValue, {
      toValue: flipToFront ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCards(prevCards =>
        prevCards.map(c =>
          c.id === card.id ? { ...c, isFlipped: flipToFront } : c
        )
      );
    });
  };

  const handleCardPress = (card: Card) => {
    if (!gameStarted) setGameStarted(true);
    if (card.isMatched || card.isFlipped || selectedCards.length === 2) return;

    flipCard(card, true);
    setSelectedCards(prev => [...prev, card]);
  };

  const endGame = () => {
    let discountCode = '';
    let scoreMultiplier = 0;
    if (moves <= 10) {
      discountCode = 'MASTER30';
      scoreMultiplier = 30;
    } else if (moves <= 15) {
      discountCode = 'GREAT20';
      scoreMultiplier = 20;
    } else if (moves <= 20) {
      discountCode = 'GOOD10';
      scoreMultiplier = 10;
    } else {
      discountCode = 'TRY5';
      scoreMultiplier = 5;
    }

    dispatch(setCurrentScore(scoreMultiplier));
    dispatch(setDiscountCode(discountCode));

    Alert.alert(
      'Congratulations!',
      `You completed the game in ${moves} moves!\nYour discount code is: ${discountCode}`,
      [{ text: 'Play Again', onPress: initializeGame }]
    );
  };

  return (
    <View>
      <Header
        title="Memory Game"
        showBack={true}
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.moves}>Moves: {moves}</Text>
        <View style={styles.grid}>
          {cards.map(card => {
            const frontInterpolate = card.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            });

            const backInterpolate = card.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-180deg'],
            });

            return (
              <TouchableOpacity key={card.id} onPress={() => handleCardPress(card)} disabled={card.isMatched}>
                <View style={styles.cardContainer}>
                  {/* Front (Image) */}
                  <Animated.View
                    style={[
                      styles.card,
                      styles.cardFront,
                      { transform: [{ rotateY: frontInterpolate }] },
                    ]}
                  >
                    <Image source={card.image} style={styles.cardImage} />
                  </Animated.View>

                  {/* Back (Hidden Side) */}
                  <Animated.View
                    style={[
                      styles.card,
                      styles.cardBack,
                      { transform: [{ rotateY: backInterpolate }] },
                    ]}
                  >
                    <View style={styles.cardHidden} />
                  </Animated.View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {!gameStarted && (
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayText}>Tap any card to start the game!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  moves: { fontSize: 18, textAlign: 'center', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  cardContainer: {
    position: 'relative',
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 8,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 12,
  },
  cardFront: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  cardHidden: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
  },
  overlayContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  overlayText: { color: '#000', fontSize: 24, fontWeight: '600', textAlign: 'center' },
});

export default GamePlayScreen;