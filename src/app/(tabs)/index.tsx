import { ActivityIndicator, FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';
import { catalogService } from '@/services/catalogService';
import React, { useEffect } from 'react';

import { CatalogItem } from '@/types/CatalogItem';
import { RootView } from '@/components/RootView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Card } from "@/components/Card";
import { TrainingCard } from '@/components/training/TrainingCard';
import { SearchBar } from '@/components/SearchBar';
import { Row } from '@/components/Row';

export default function HomeScreen() {

  const [items, setItems] = React.useState<CatalogItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const colors = useThemeColors();
  const { height: screenHeight } = Dimensions.get('screen');

  const filteredFormations = search ? items.filter(formation => formation.title.toLowerCase().includes(search.toLowerCase()) ) : items;

  useEffect (() => {
    const loadCatalog = async () => {
      try {
        const formations = await catalogService.getCatalogItems();
        setItems(formations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);


  return (
      <RootView>
        <View style = {{ paddingVertical: screenHeight * 0.02}}>
            <Image 
              source={require("@/../assets/images/logo-dawan-rouge-OFFICIEL.png")} 
              style={{
                width:  screenHeight * 0.06 * 4,
                height: screenHeight * 0.06 ,
              }}
              resizeMode='contain'
            />
        <Row style = {{ paddingVertical: screenHeight * 0.02}}>
          <SearchBar value={search} onChange={setSearch} />
        </Row>
        </View>
        <Card style={styles.body}>
            <FlatList 
              data={filteredFormations}
              numColumns={3}
              contentContainerStyle={[styles.gridGap, styles.list]}
              columnWrapperStyle={styles.gridGap}
              ListFooterComponent={
                loading ? <ActivityIndicator color={colors.redCustom}/>: null
              }
              renderItem={({item}) => 
                <TrainingCard 
                  name={item.title} 
                  slug={item.slug}
                  duration={item.duration} 
                  objectives={item.objectives} 
                  style={{flex: 1/3}}
                />} 
              keyExtractor={(item) => item.slug.toString()}
            />
        </Card>
      </RootView>
  );
}

export const styles = StyleSheet.create({
    list: {
        padding:12,
    },
    body: {
        flex: 1,
    },
    gridGap: {
        gap: 8,
    }, 
})