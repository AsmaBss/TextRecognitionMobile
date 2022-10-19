import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import ImageEditor from '@react-native-community/image-editor';

export default function Sonede() {
  const [image, setImage] = useState();
  const [text, setText] = useState();

  const [imageNum, setImageNum] = useState();
  const [imageDuration, setImageDuration] = useState();
  const [imageTopay, setImageTopay] = useState();
  const [imageDate, setImageDate] = useState();

  const [textNum, setTextNum] = useState();
  const [textDuration, setTextDuration] = useState();
  const [textTopay, setTextTopay] = useState();
  const [textDate, setTextDate] = useState();

  const croppedNum = t => {
    ImageEditor.cropImage(t.path, {
      offset: {x: 528, y: 4},
      size: {width: 211, height: 158},
      displaySize: {width: 211, height: 158},
      resizeMode: 'contain',
    }).then(async i => {
      setImageNum(i);
      const result = await TextRecognition.recognize(i);
      console.log('number detected === ', result);
      setTextNum(result[0]);
    });
  };
  const croppedDuration = t => {
    ImageEditor.cropImage(t.path, {
      offset: {x: 73, y: 1},
      size: {width: 216, height: 158},
      displaySize: {width: 216, height: 158},
      resizeMode: 'contain',
    }).then(async i => {
      setImageDuration(i);
      const result = await TextRecognition.recognize(i);
      console.log('duration detected === ', result);
      setTextDuration(result[0]);
    });
  };
  const croppedTopay = t => {
    ImageEditor.cropImage(t.path, {
      offset: {x: 239, y: 280},
      size: {width: 223, height: 158},
      displaySize: {width: 223, height: 158},
      resizeMode: 'contain',
    }).then(async i => {
      setImageTopay(i);
      const result = await TextRecognition.recognize(i);
      console.log('topay detected === ', result);
      setTextTopay(result[0]);
    });
  };
  const croppedDate = t => {
    ImageEditor.cropImage(t.path, {
      offset: {x: 47, y: 280},
      size: {width: 225, height: 158},
      displaySize: {width: 225, height: 158},
      resizeMode: 'contain',
    }).then(async i => {
      setImageDate(i);
      const result = await TextRecognition.recognize(i);
      console.log('date detected === ', result);
      setTextDate(result[0]);
    });
  };

  const onSelectImage = () =>
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(async image => {
      console.log('image === ', image);
      setImage(image.path);
      croppedNum(image);
      croppedDuration(image);
      croppedDate(image);
      croppedTopay(image);
    });
  const onTakePhoto = () =>
    ImagePicker.openCamera({
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(async image => {
      console.log('image === ', image);
      setImage(image.path);
      console.log('---- Text Recognition ----');
      const result = await TextRecognition.recognize(image.path);
      console.log('text detected === ', result);
      setText(result[0]);
      croppedNum(image);
      croppedDuration(image);
    });

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Facture TOPNET</Text>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.buttonImage} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonImage} onPress={onSelectImage}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 10}}>Numéro de la facture </Text>
        <TextInput
          placeholder="numéro de la facture"
          style={styles.input}
          defaultValue={textNum}
          onChangeText={val => setTextNum(val)}
        />
      </View>
      <Image
        source={{
          uri: imageNum,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 10}}>Durée de la facture </Text>
        <TextInput
          placeholder="numéro de la facture"
          style={styles.input}
          defaultValue={textDuration}
          onChangeText={val => setTextDuration(val)}
        />
      </View>
      <Image
        source={{
          uri: imageDuration,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 10}}>Montant à payer </Text>
        <TextInput
          placeholder="montant à payer"
          style={styles.input}
          defaultValue={textTopay}
          onChangeText={val => setTextTopay(val)}
        />
      </View>
      <Image
        source={{
          uri: imageTopay,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{flexDirection: 'row'}}>
        <Text style={{padding: 10}}>Date de la facture </Text>
        <TextInput
          placeholder="date de la facture"
          style={styles.input}
          defaultValue={textDate}
          onChangeText={val => setTextDate(val)}
        />
      </View>
      <Image
        source={{
          uri: imageDate,
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#2B2E61',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 30,
  },
  input: {
    padding: 8,
    width: 170,
  },
  buttonImage: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
    marginHorizontal: 5,
    width: 150,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    height: 200,
    width: 300,
    alignSelf: 'center',
  },
});
