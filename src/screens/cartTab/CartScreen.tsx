import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../components/carTab/EmptyCart';
import { itemCartRemove } from '../../redux/action/action';
import { useNavigation } from '@react-navigation/native';
const CartScreen = () => {
  const navigation = useNavigation();
  const itemCartRedux = useSelector(state => state.itemCartReducer);
  const dispatch = useDispatch();
  // Handler to remove item from cart, Redux
  const handleRemoveItem = item => {
    dispatch(itemCartRemove(item));
  };

  const subtotal = itemCartRedux.reduce((acc, item) => acc + item.price, 0);
  const shippingFee = subtotal > 40 || subtotal === 0 ? 0.0 : 5.99;
  const grandTotal = subtotal + shippingFee;

  const renderCartItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => handleRemoveItem(item)}
            style={styles.deleteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.counterRow}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialCommunityIcons name="minus" size={16} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{/* {item.quantity} */}1</Text>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialCommunityIcons name="plus" size={16} color="#111827" />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemTotalPrice}>
            {/* ${(item.price * item.quantity).toFixed(2)} */}1
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>
            {itemCartRedux.length}{' '}
            {itemCartRedux.length === 1 ? 'Item' : 'Items'}
          </Text>
        </View>
      </View>

      {itemCartRedux.length === 0 ? (
        // define in component.
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={itemCartRedux}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footerContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Est. Shipping</Text>
              <Text style={styles.summaryValue}>
                <Text style={styles.freeShippingText}>FREE</Text>
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={[styles.summaryRow, { marginBottom: 20 }]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              activeOpacity={0.8}
              onPress={() => {
                // Handel to go in check out screen.
                navigation.navigate('CheckoutScreen');
              }}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="#FFFFFF"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  badgeContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  qtyBtn: {
    padding: 6,
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  freeShippingText: {
    color: '#10B981',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  checkoutButton: {
    backgroundColor: '#111827',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
