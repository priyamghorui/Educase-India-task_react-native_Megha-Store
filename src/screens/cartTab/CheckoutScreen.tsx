import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
const CheckoutScreen = () => {
  // Fack data.
  const orderId = 'TXN-749204-2026';
  const estimatedDelivery = 'May 22, 2026';
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <View style={styles.successIconOuterCircle}>
          <View style={styles.successIconInnerCircle}>
            <MaterialCommunityIcons name="check" size={44} color="#10B981" />
          </View>
        </View>

        <Text style={styles.thankYouTitle}>Thanks for Shopping!</Text>
        <Text style={styles.thankYouSubtitle}>
          Your order has been placed successfully and our team is already
          preparing your package.
        </Text>

        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.receiptLabel}>Order ID</Text>
              <Text style={styles.receiptValue}>{orderId}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="content-copy"
                size={16}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.receiptDivider} />

          <View style={styles.receiptRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.receiptLabel}>Estimated Delivery</Text>
              <Text style={styles.receiptValue}>{estimatedDelivery}</Text>
            </View>
            <View style={styles.deliveryBadge}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={16}
                color="#1A365D"
              />
              <Text style={styles.deliveryBadgeText}>In Transit</Text>
            </View>
          </View>
        </View>

        <Text style={styles.notificationNotice}>
          A confirmation email with tracking updates has been sent to your
          registered address.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => {
            // After click back to home tab.
            navigation.navigate('TabBarNavigation');
          }}
        >
          <MaterialCommunityIcons
            name="shopping-outline"
            size={20}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  successIconOuterCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  successIconInnerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34D399' + '25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  thankYouSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  receiptCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    width: width - 64,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBlock: {
    flex: 1,
  },
  receiptLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  receiptValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  copyButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deliveryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A365D',
    marginLeft: 4,
  },
  notificationNotice: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 36,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#111827',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
