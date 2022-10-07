import { Button, View, TextInput, Text, SafeAreaView } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore"; 
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { TouchableRipple} from 'react-native-paper';
import InlineTextButton from '../components/InlineTextButton';
import { Header as HeaderRNE } from '@rneui/themed';

export default function ManageAccount({ navigation }) {
  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");
  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }

  let updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword).then(() => {
          setNewPassword("");
          setErrorMessage("");
          setCurrentPassword("");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("Nhập mật khẩu hiện tại để xóa tài khoản!");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        // Get all todos for user and delete
        let batch = writeBatch(db);
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          batch.commit();
  
          deleteUser(user).then(() => {
            navigation.popToTop();
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    }
  };

  return (
    <SafeAreaView>
      <HeaderRNE
        rightComponent={
          <InlineTextButton text="Xong" color="#000000" onPress={() => navigation.pop()}/>
        }
        centerComponent={{ text: 'Tài khoản', style: AppStyles.header }}
      />
      
      <View style={AppStyles.menuWrapper}>
      <TouchableRipple onPress={() => {}}>
            <View style={AppStyles.menuItem,AppStyles.background}>
              <Text style={AppStyles.menuItemText}>👤 Email user</Text>
            </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("Answer")}>
            <View style={AppStyles.menuItem,AppStyles.background}>
              <Text style={AppStyles.menuItemText}>Cá nhân hóa</Text>
            </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("UserGuide")}>
            <View style={AppStyles.menuItem,AppStyles.background}>
              <Text style={AppStyles.menuItemText}>Hướng dẫn sử dụng</Text>
            </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ResetPassword")}>
            <View style={AppStyles.menuItem,AppStyles.background}>
              <Text style={AppStyles.menuItemText}>Đổi Mật khẩu</Text>
            </View>
          </TouchableRipple>
        <TouchableRipple onPress={logout}>
            <View style={AppStyles.menuItem,AppStyles.background}>
              <Text style={AppStyles.menuItemText}>Đăng xuất</Text>
            </View>
          </TouchableRipple>
      </View>
    </SafeAreaView>  
  );
}

