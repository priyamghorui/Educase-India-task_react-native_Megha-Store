import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCategories } from '../../services/categoryApi';

// Fack as per API Data.
const CATEGORY_THEMES = {
  beauty: {
    icon: 'face-woman-outline',
    accentColor: '#702459',
    subtitle: 'Luxury makeup, skincare & essentials',
  },
  fragrances: {
    icon: 'scent',
    accentColor: '#4A5568',
    subtitle: 'Exquisite perfumes & premium colognes',
  },
  furniture: {
    icon: 'sofa-outline',
    accentColor: '#7B341E',
    subtitle: 'Modern living & designer spaces',
  },
  groceries: {
    icon: 'basket-outline',
    accentColor: '#2F855A',
    subtitle: 'Fresh daily items & organic selections',
  },
};

const DEFAULT_THEME = {
  icon: 'tag-outline',
  accentColor: '#1F2937',
  subtitle: 'Explore our premium curated collection',
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Api call for get Categories.
        const data = await getCategories();

        if (Array.isArray(data)) {
          const structuredCategories = data.slice(0, 4).map(e => {
            const normalizedKey = e.replace(/-/g, '_');
            const matchKey = CATEGORY_THEMES[e]
              ? e
              : CATEGORY_THEMES[normalizedKey]
              ? normalizedKey
              : null;
            const theme = matchKey ? CATEGORY_THEMES[matchKey] : DEFAULT_THEME;

            const friendlyTitle = e
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return {
              id: e,
              title: friendlyTitle,
              subtitle: theme.subtitle,
              icon: theme.icon,
              accentColor: theme.accentColor,
            };
          });
          setCategories(structuredCategories);
        }
      } catch (error) {
        console.error('Sonthing went wrong.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryCard = ({ item }) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedCategory(item.id);
          navigation.navigate('ProductsScreen', {
            categoryId: item.id,
            title: item.title,
            navigation: navigation,
          });
        }}
        style={[
          styles.card,
          isSelected && {
            borderColor: item.accentColor,
            borderWidth: 2,
            elevation: 4,
          },
        ]}
      >
        <View
          style={[styles.accentLine, { backgroundColor: item.accentColor }]}
        />

        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.cardTitle,
                isSelected && { color: item.accentColor },
              ]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>
          </View>

          <View
            style={[
              styles.iconContainer,
              { backgroundColor: item.accentColor + '15' },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color={item.accentColor}
            />
          </View>
        </View>

        {isSelected && (
          <View
            style={[styles.selectedPill, { backgroundColor: item.accentColor }]}
          >
            <MaterialCommunityIcons name="check" size={12} color="#FFF" />
            <Text style={styles.selectedText}>{item.title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#111827" />
          <Text style={styles.loadingText}>
            Fetching luxury catalog matrix...
          </Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.titleText}>MEGHA STORE</Text>
              <Text style={styles.brandText}>PREMIUM AND LUXURY</Text>
              <Text style={styles.subtitleText}>
                Select a category to explore curated collections tailored just
                for you.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 24,
    ptTop: 30,
    paddingBottom: 20,
  },
  brandText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 3,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 24,
    height: 110,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  accentLine: {
    width: 6,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPill: {
    position: 'absolute',
    top: -1,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  selectedText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
    textTransform: 'uppercase',
  },
});
