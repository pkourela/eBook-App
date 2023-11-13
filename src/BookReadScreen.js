import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const BookReadScreen = ({route, navigation}) => {

    const { item } = route.params;
 
    return (
      <WebView
        source={{uri:item.pdfLink}}
      />
    )
}


export default BookReadScreen;