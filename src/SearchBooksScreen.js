import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, FlatList, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';


const SearchBooksScreen = ( { navigation } ) => {
 
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/pkourela/books/main/booksContent.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

 

  const ItemView = ({item}) => {
        return  (
            <View style={styles.BookWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', {item: item}) } >
                    <View style={styles.ItemWrapper}>
                        <Image source={{uri:item.imageLink}} style={styles.AllBookImage}/>
                        <Text style={styles.BookTitle}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
                {/* <FavouriteButton/> */}
            </View>
            )
        }  

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    marginLeft: 15,
    fontSize: 19,
    flex: 1,
  },
  searchWrapper: {
    marginHorizontal: 15,
    marginBottom: 9,
    backgroundColor: '#F8F8F8',
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  headerIcon: {
    height:25,
    width:25,
    marginLeft: 20
  },
  AllBookImage: {
    borderRadius: 7,
    height: 90,
    width: 70,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  headerTextCategory: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  BgScreen:{
    backgroundColor: 'white'
  },
  ItemWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
  },
  BookTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 2},
    shadowOpacity: 0.3,
    elevation: 6,
    
},
btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
}
});

export default SearchBooksScreen;
