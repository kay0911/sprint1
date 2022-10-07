import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Header as HeaderRNE } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';


export default function ToDo({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [toDos, setToDos] = React.useState([]);

  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({item}) => {
    return (
      <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked)}}
          />
        </View>
        <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteToDo(item.id)} />
      </View>
    );
  }

  let showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id} />
    )
  };

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList() }
        <Button 
          title="Add Task" 
          onPress={() => setModalVisible(true)} 
          color="#fb4d3d" />
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Xác thực email để sử dụng</Text>
        <Button title="Xác Nhận Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    );
  };

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };
  
  return (
    <SafeAreaView>
      <HeaderRNE
        rightComponent={
          <AntDesign name="user" size={24} color="black" 
          onPress={() => navigation.navigate("ManageAccount")} />
        }
        centerComponent={{ text: 'Task', style: AppStyles.header }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddToDoModal 
          onClose={() => setModalVisible(false)}
          addToDo={addToDo} />
      </Modal>
      {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
    </SafeAreaView>
  )
}

