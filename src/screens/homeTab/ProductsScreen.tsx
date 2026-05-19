import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/universal/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { itemCart } from '../../redux/action/action';
import { getProductsByCategory } from '../../services/productApi';

const COLUMN_WIDTH = (Dimensions.get('window').width - 48) / 2;
const LIMIT = 10; // After reaching end we load 10 items.

const ProductsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const itemCartRedux = useSelector(state => state.itemCartReducer);
  const { categoryId, title, navigation } = route.params;

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (currentSkip, isInitialLoad = false) => {
    if (loading || loadingMore || (!hasMore && !isInitialLoad)) return;

    if (isInitialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      // Api call for get Products By Category.
      const data = await getProductsByCategory(LIMIT, currentSkip);

      if (data && data.products) {
        setProducts(prevProducts => {
          const existingIds = new Set(prevProducts.map(p => p.id));
          const uniqueNewProducts = data.products.filter(
            p => !existingIds.has(p.id),
          );
          return [...prevProducts, ...uniqueNewProducts];
        });

        if (products.length + data.products.length >= data.total) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching products from dummyjson:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(0, true);
  }, []);
  // After reaching end when scroll it load 10 more data.
  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore && !loading && searchQuery.trim() === '') {
      const nextSkip = skip + LIMIT;
      setSkip(nextSkip);
      fetchProducts(nextSkip, false);
    }
  }, [skip, hasMore, loadingMore, loading, searchQuery]);

  // It filter as per search.
  const filteredProducts = products.filter(
    product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const renderProductCard = ({ item }) => {
    const renderStars = rating => {
      const stars = [];
      const floorRating = Math.floor(rating);
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <MaterialCommunityIcons
            key={i}
            name={
              i <= floorRating
                ? 'star'
                : i - rating < 1
                ? 'star-half-full'
                : 'star-outline'
            }
            size={14}
            color="#F59E0B"
          />,
        );
      }
      return stars;
    };

    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {item.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{Math.round(item.discountPercentage)}%
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoWrapper}>
          <Text style={styles.brandText} numberOfLines={1}>
            {item.brand || 'Generic'}
          </Text>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>{renderStars(item.rating)}</View>
            <Text style={styles.ratingValue}>({item.rating})</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.7}
              onPress={() => {
                console.log(item);
                dispatch(itemCart(item));
              }}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (searchQuery.trim() !== '') return null;

    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#111827" />
          <Text style={styles.footerText}>Sourcing more premium deals...</Text>
        </View>
      );
    }
    if (!hasMore && products.length > 0) {
      return (
        <View style={styles.footerLoader}>
          <Text style={styles.endOfCatalogueText}>
            You've explored all current collection entries
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.navBar}>
        <BackButton navigation={navigation} />
        <Text style={styles.navTitle}>{title}</Text>
        <TouchableOpacity
          style={{
            ...styles.iconButton,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#111827"
          />
          {itemCartRedux?.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{itemCartRedux?.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search items, brands, trends..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading && products.length === 0 ? (
        <View style={styles.centerLoadingWrapper}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.loadingText}>Structuring catalog layout...</Text>
        </View>
      ) : searchQuery.length > 0 && filteredProducts.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <MaterialCommunityIcons
            name="magnify-close"
            size={60}
            color="#9CA3AF"
          />
          <Text style={styles.noResultsTitle}>No matching items found</Text>
          <Text style={styles.noResultsSubtitle}>
            We couldn't find any results matching "{searchQuery}". Please check
            spellings.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridRowWrapper}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  navBar: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  iconButton: {
    padding: 6,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  searchBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  centerLoadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 6,
  },
  noResultsSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  gridRowWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    width: COLUMN_WIDTH,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9FAFB',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  infoWrapper: {
    padding: 12,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    height: 40,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
  },
  ratingValue: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#111827',
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },
  endOfCatalogueText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
