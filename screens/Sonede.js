import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import ImageEditor from '@react-native-community/image-editor';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_SONEDE,
  GET_SONEDE,
  UPDATE_SONEDE,
} from '../graphql/facture.graphql';

export default function Sonede() {
  // image et texte réel
  const [image, setImage] = useState();
  const [text, setText] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  // coordonnées de num facture
  const [numHeight, setnumHeight] = useState('180'); //350 //----350
  const [numWidth, setnumWidth] = useState('700'); //1323  //----750
  const [numX, setnumX] = useState('3200'); //6187 //----3200
  const [numY, setnumY] = useState('530'); //1147 //----400
  // coordonnées de montant facture
  const [topayHeight, settopayHeight] = useState('350'); //450
  const [topayWidth, settopayWidth] = useState('750'); //1400
  const [topayX, settopayX] = useState('2800'); //5300
  const [topayY, settopayY] = useState('1500'); //3300
  // coordonnées de date facture
  const [dateHeight, setdateHeight] = useState('450'); //450
  const [dateWidth, setdateWidth] = useState('800'); //1240
  const [dateX, setdateX] = useState('0');
  const [dateY, setdateY] = useState('1400'); //3100

  // image de chaque zone
  const [imageNum, setImageNum] = useState();
  const [imageTopay, setImageTopay] = useState();
  const [imageDate, setImageDate] = useState();
  // texte de chaque zone
  const [textNum, setTextNum] = useState(0);
  const [textTopay, setTextTopay] = useState(0);
  const [textDate, setTextDate] = useState('');

  // save
  const [addSonede] = useMutation(ADD_SONEDE, {
    variables: {
      num: +textNum,
      date: textDate,
      topay: parseFloat(textTopay),
      type: 'Sonede',
      status: 'Unpayed',
    },
    onCompleted(data) {
      Alert.alert('Add Success');
      console.log(data);
    },
    onError(error) {
      Alert.alert('Error');
      console.log(error);
    },
  });

  // settings
  const [updateSonede] = useMutation(UPDATE_SONEDE, {
    variables: {
      numHeight: parseFloat(numHeight),
      numWidth: parseFloat(numWidth),
      numX: parseFloat(numX),
      numY: parseFloat(numY),
      dateHeight: parseFloat(dateHeight),
      dateWidth: parseFloat(dateWidth),
      dateX: parseFloat(dateX),
      dateY: parseFloat(dateY),
      topayHeight: parseFloat(topayHeight),
      topayWidth: parseFloat(topayWidth),
      topayX: parseFloat(topayX),
      topayY: parseFloat(topayY),
      id: 1,
    },
    onCompleted(data) {
      Alert.alert('Update Success');
      console.log(data);
    },
    onError(error) {
      Alert.alert('Error');
      console.log(error);
    },
  });

  // *********************************************************************************

  const { data, error, loading } = useQuery(GET_SONEDE);

  // ***********************************************************************************
  if (!loading) {
    console.log('getAll', data);
  }

  const croppedNum = t => {
    ImageEditor.cropImage(t.path, {
      offset: { x: parseInt(numX), y: parseInt(numY) },
      size: {
        width: parseInt(numWidth),
        height: parseInt(numHeight),
      },
      displaySize: {
        width: parseInt(numWidth),
        height: parseInt(numHeight),
      },
      resizeMode: 'contain',
    }).then(async i => {
      console.log('i = ', i);
      setImageNum(i);
      const result = await TextRecognition.recognize(i);
      console.log('number detected === ', result);
      setTextNum(result[0]);
    });
  };
  const croppedTopay = t => {
    ImageEditor.cropImage(t.path, {
      offset: { x: parseInt(topayX), y: parseInt(topayY) },
      size: { width: parseInt(topayWidth), height: parseInt(topayHeight) },
      displaySize: {
        width: parseInt(topayWidth),
        height: parseInt(topayHeight),
      },
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
      offset: { x: parseInt(dateX), y: parseInt(dateY) },
      size: { width: parseInt(dateWidth), height: parseInt(dateHeight) },
      displaySize: { width: parseInt(dateWidth), height: parseInt(dateHeight) },
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
      croppedNum(image);
      croppedDate(image);
      croppedTopay(image);
    });

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ marginBottom: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>SONEDE</Text>

          <TouchableOpacity
            style={{ marginTop: 40, marginLeft: 120 }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Feather name="settings" style={{ fontSize: 35 }} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ margin: 20 }}>Bill number :</Text>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>Height : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                      marginRight: 15,
                    }}
                    defaultValue={numHeight}
                    placeholder="Height value"
                    onChangeText={val => {
                      setnumHeight(val);
                    }}
                  />
                  <Text style={{ marginTop: 5 }}>Width : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    defaultValue={numWidth}
                    placeholder="Width value"
                    onChangeText={val => setnumWidth(val)}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>X : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                      marginRight: 15,
                    }}
                    defaultValue={numX}
                    placeholder="X value"
                    onChangeText={val => setnumX(val)}
                  />
                  <Text style={{ marginTop: 5 }}>Y : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    defaultValue={numY}
                    placeholder="Y value"
                    onChangeText={val => setnumY(val)}
                  />
                </View>
              </View>

              <Text style={{ margin: 20 }}>Bill topay :</Text>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>Height : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                      marginRight: 15,
                    }}
                    placeholder="Height value"
                    defaultValue={topayHeight}
                    onChangeText={val => settopayHeight(val)}
                  />
                  <Text style={{ marginTop: 5 }}>Width : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    placeholder="Width value"
                    defaultValue={topayWidth}
                    onChangeText={val => settopayWidth(val)}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>X : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                      marginRight: 15,
                    }}
                    placeholder="X value"
                    defaultValue={topayX}
                    onChangeText={val => settopayX(val)}
                  />
                  <Text style={{ marginTop: 5 }}>Y : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    placeholder="Y value"
                    defaultValue={topayY}
                    onChangeText={val => settopayY(val)}
                  />
                </View>
              </View>

              <Text style={{ margin: 20 }}>Bill date :</Text>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>Height : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                      marginRight: 15,
                    }}
                    placeholder="Height  value"
                    defaultValue={dateHeight}
                    onChangeText={val => setdateHeight(val)}
                  />
                  <Text style={{ marginTop: 5 }}>Width : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    placeholder="Width value"
                    defaultValue={dateWidth}
                    onChangeText={val => setdateWidth(val)}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 5 }}>X : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 120,
                      marginRight: 15,
                    }}
                    placeholder="X value"
                    defaultValue={dateX}
                    onChangeText={val => setdateX(val)}
                  />
                  <Text style={{ marginTop: 5 }}>Y : </Text>
                  <TextInput
                    style={{
                      paddingTop: 2,
                      paddingBottom: 2,
                      width: 100,
                    }}
                    placeholder="Y value"
                    defaultValue={dateY}
                    onChangeText={val => setdateY(val)}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    updateSonede();
                  }}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.buttonImage} onPress={onTakePhoto}>
            <Text style={styles.buttonText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonImage} onPress={onSelectImage}>
            <Text style={styles.buttonText}>Pick a photo</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ padding: 10 }}>Bill number </Text>
          <TextInput
            placeholder="numéro de la facture"
            style={styles.input}
            defaultValue={textNum}
            onChangeText={val => setTextNum(val)}
            keyboardType="numeric"
          />
        </View>
        <Image
          source={{
            uri: imageNum,
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ padding: 10 }}>Bill topay </Text>
          <TextInput
            placeholder="montant à payer"
            style={styles.input}
            defaultValue={textTopay}
            onChangeText={val => setTextTopay == val}
          />
        </View>
        <Image
          source={{
            uri: imageTopay,
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ padding: 10 }}>Bill date </Text>
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
        <View style={{ marginLeft: 150 }}>
          <TouchableOpacity style={styles.buttonImage} onPress={addSonede}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flexDirection: 'row',
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
    width: 170,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    height: 200,
    width: 300,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: '#2B2E61',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 100,
    width: 390,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
