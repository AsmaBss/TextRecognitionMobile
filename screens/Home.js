import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const Home = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Steg')}>
          <Text style={styles.buttonText}>Facture STEG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sonede')}>
          <Text style={styles.buttonText}>Facture SONEDE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Topnet')}>
          <Text style={styles.buttonText}>Facture TOPNET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Telecom')}>
          <Text style={styles.buttonText}>Facture TELECOM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2E61',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Home;
