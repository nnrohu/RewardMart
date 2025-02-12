import React from 'react';
import {StyleSheet} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';

interface PaginationDotProps {
  images: string[];
  activeSlide: number;
}

const PaginationDot: React.FC<PaginationDotProps> = ({images, activeSlide}) => {
  return (
    <Pagination
      dotsLength={images.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.inactivePaginationDot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.7}
    />
  );
};

export default PaginationDot;

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  inactivePaginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});
