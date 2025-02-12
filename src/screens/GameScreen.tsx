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

const GameScreen = () => {
  const navigation = useNavigation();
  const {highScore, discountCode} = useSelector(
    (state: RootState) => state.game,
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/game-banner.png')}
          style={styles.banner}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Play & Win Discounts!</Text>
          <Text style={styles.description}>
            Test your skills in our exciting game and win exclusive discount
            codes! The higher your score, the better the discount.
          </Text>

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

          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsTitle}>Possible Rewards:</Text>
            <Text style={styles.rewardItem}>• Score 25+ : 5% discount</Text>
            <Text style={styles.rewardItem}>• Score 50+ : 10% discount</Text>
            <Text style={styles.rewardItem}>• Score 100+ : 20% discount</Text>
            <Text style={styles.rewardItem}>• Score 200+ : 30% discount</Text>

            {/* Dynamic display based on score */}
            {highScore >= 50 && highScore < 100 && (
              <Text style={styles.rewardItem}>
                You have earned a 10% discount!
              </Text>
            )}
            {highScore >= 100 && highScore < 200 && (
              <Text style={styles.rewardItem}>
                You have earned a 20% discount!
              </Text>
            )}
            {highScore >= 200 && (
              <Text style={styles.rewardItem}>
                You have earned a 30% discount!
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  rewardsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  rewardItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});

export default GameScreen;
