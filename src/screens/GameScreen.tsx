import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import Header from '../components/Header';

const GameScreen = () => {
  const navigation = useNavigation();
  const {highScore, discountCode} = useSelector(
    (state: RootState) => state.game,
  );

  return (
    <View style={styles.container}>
      <Header title="Games" />
      <ScrollView>
        <Image
          source={require('../assets/game-banner.png')}
          style={styles.banner}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Play & Win Discounts!</Text>
          <Text style={styles.description}>
            Challenge your memory in our exciting card-matching game and win exclusive discount codes! Match pairs of cards in fewer moves to earn bigger rewards.
          </Text>

          <View style={styles.instructionsContainer}>
            <Text style={styles.sectionTitle}>How to Play</Text>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>1</Text>
              <Text style={styles.instructionText}>Tap cards to flip them and reveal discount values</Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>2</Text>
              <Text style={styles.instructionText}>Find matching pairs of discount cards</Text>
            </View>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>3</Text>
              <Text style={styles.instructionText}>Complete the game in fewer moves to earn bigger discounts</Text>
            </View>
          </View>

          <View style={styles.rewardsContainer}>
            <Text style={styles.sectionTitle}>Rewards</Text>
            <View style={styles.rewardsList}>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🏆</Text>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>Master Player</Text>
                  <Text style={styles.rewardText}>Complete in 10 moves or less</Text>
                  <Text style={styles.discountValue}>30% OFF</Text>
                </View>
              </View>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🥈</Text>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>Expert Player</Text>
                  <Text style={styles.rewardText}>Complete in 15 moves or less</Text>
                  <Text style={styles.discountValue}>20% OFF</Text>
                </View>
              </View>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🥉</Text>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>Skilled Player</Text>
                  <Text style={styles.rewardText}>Complete in 20 moves or less</Text>
                  <Text style={styles.discountValue}>10% OFF</Text>
                </View>
              </View>
              <View style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>🎮</Text>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>Game Participant</Text>
                  <Text style={styles.rewardText}>Complete in more than 20 moves</Text>
                  <Text style={styles.discountValue}>5% OFF</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>High Score:</Text>
            <Text style={styles.score}>{highScore}</Text>
          </View>

          {!discountCode ? (
            <Text style={styles.noDiscountMessage}>
              No discount code yet. Play to earn one!
            </Text>
          ) : (
            <View style={styles.discountContainer}>
              <Text style={styles.discountLabel}>Your Discount Code:</Text>
              <Text style={styles.discountCode}>{discountCode}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('GamePlay')}
            accessibilityLabel="Start the game"
            accessibilityHint="Takes you to the game play screen">
            <Text style={styles.playButtonText}>Play Now!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00b894',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
    lineHeight: 22,
  },
  rewardsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardsList: {
    gap: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  rewardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  rewardText: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 4,
  },
  discountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b894',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  score: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  discountContainer: {
    backgroundColor: '#E8F2FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  discountLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  discountCode: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  noDiscountMessage: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  playButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});

export default GameScreen;
