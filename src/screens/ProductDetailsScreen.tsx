import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {RootStackParamList} from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import PaginationDot from '../components/PaginationDot';
import {addToCart} from '../store/cartSlice';
import Header from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

const {width} = Dimensions.get('window');

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const {product} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = ({item}: {item: string}) => (
    <View style={styles.carouselItem}>
      <Image
        source={{uri: item}}
        style={styles.carouselImage}
        resizeMode="center"
      />
    </View>
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Product Details" 
        showBack={true} 
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        <View>
        <Carousel
          data={product.images}
          renderItem={renderCarouselItem}
          sliderWidth={width}
          itemWidth={width}
          autoplay
          loop
          autoplayDelay={3000}
          onSnapToItem={index => setActiveSlide(index)}
        />
        <PaginationDot images={product.images} activeSlide={activeSlide} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Icon name="cart" size={24} color="white" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 10,
  },
  carouselItem: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProductDetailsScreen;
