import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const EmptyCart = () => {
    const navigation = useNavigation();
  return (
    <>
      <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <MaterialCommunityIcons name="cart-off" size={48} color="#9CA3AF" />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet. Go ahead and explore top categories!
          </Text>
          <TouchableOpacity style={styles.shopNowButton} activeOpacity={0.8} onPress={()=>{navigation.navigate("Home")}}>
            <Text style={styles.shopNowText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
    </>
  )
}

export default EmptyCart

const styles = StyleSheet.create({
 

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
