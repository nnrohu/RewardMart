import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PaginationDot from './PaginationDot';

interface Banner {
  id: number;
  image: string;
  title: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

const {width} = Dimensions.get('window');

const BannerCarousel: React.FC<BannerCarouselProps> = ({banners}) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({item, index}: {item: Banner; index: number}) => {
    return (
      <View style={styles.slide}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 32}
        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <PaginationDot
        images={banners.map(banner => banner.image)}
        activeSlide={activeSlide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: 'gray',
    borderRadius:8
  },
  slide: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default BannerCarousel;
