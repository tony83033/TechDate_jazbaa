import { StyleSheet, Text, View,SafeAreaView,Image,ActivityIndicator } from 'react-native'
import React from 'react'
import { Border, Color, FontSize } from "../../GlobalStyles";
import Frame from '@/components/screens/auth';
import HomeScreen from '@/components/screens/home/Home';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link,router,Redirect  } from 'expo-router';
import { useState,useEffect } from 'react';
import { useCustomFunction } from '../context/techDateContext';
WebBrowser.maybeCompleteAuthSession();

const index = () => {

  const { user, loading } = useCustomFunction();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }}>
        <ActivityIndicator size="large" color="#4834DF" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      {user ? <HomeScreen /> : <Redirect href="/(auth)" />}
    </SafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({
  textFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  buttonLayout: {
    height: 56,
    width: 295,
  },
  buttonItemPosition: {
    borderRadius: Border.br_13xl,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  loginTypo: {
    fontWeight: "700",
//  fontFamily: FontFamily.headingH3,
  },
  timeClr: {
    color: Color.mainBlack,
    textAlign: "center",
  },
  iconLayout: {
    height: 29,
    width: 29,
    position: "absolute",
  },
  homeLayout: {
    height: 36,
    width: 375,
    left: 0,
    position: "absolute",
  },
  capacityBg: {
    backgroundColor: Color.mainBlack,
    position: "absolute",
  },
  topBarLayout: {
    height: 44,
    width: 375,
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  dontHaveAn: {
    color: "rgba(34, 23, 42, 0.7)",
//  fontFamily: FontFamily.headingH3,
  },
  signUp: {
    color: Color.mainSecondary1,
    fontWeight: "600",
//  fontFamily: FontFamily.headingH3,
  },
  dontHaveAnContainer: {
    width: "74.93%",
    top: "91.63%",
    left: "12.53%",
    lineHeight: 20,
    textAlign: "center",
    fontSize: FontSize.h614Regular_size,
    position: "absolute",
  },
  instanceChild: {
    backgroundColor: Color.mainPrimary,
  },
  buttonInner: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  buttonChild: {
    top: 8,
    left: 8,
    width: 40,
    height: 40,
    position: "absolute",
  },
  loginWithPhone: {
    left: 85,
    color: Color.textWhiteFFFFFF,
    lineHeight: 24,
    fontSize: FontSize.bodyMediumBold_size,
    top: 16,
    fontWeight: "700",
    textAlign: "center",
    position: "absolute",
  },
  buttonItem: {
    backgroundColor: Color.mainSecondary1,
    opacity: 0.1,
  },
  loginWithGoogle: {
    left: 82,
    color: Color.mainPrimary,
    lineHeight: 24,
    fontSize: FontSize.bodyMediumBold_size,
    top: 16,
    fontWeight: "700",
    textAlign: "center",
    position: "absolute",
  },
  button1: {
    marginTop: 16,
  },
  buttons: {
    height: "15.76%",
    width: "78.67%",
    top: "71.92%",
    right: "10.67%",
    bottom: "12.32%",
    left: "10.67%",
  },
  heading: {
    fontSize: FontSize.headingH3_size,
    lineHeight: 36,
    width: 279,
    fontWeight: "700",
//  fontFamily: FontFamily.headingH3,
  },
  text: {
    top: 480,
    left: 48,
    width: 279,
  },
  groupIcon1: {
    top: 108,
    right: 42,
    width: 290,
    height: 284,
    position: "absolute",
  },
  java3Icon: {
    top: 309,
    left: 221,
  },
  python1Icon: {
    top: 282,
    left: 52,
  },
  docker1Icon: {
    top: 179,
    left: 88,
  },
  laptop1Icon: {
    top: 115,
    left: 179,
  },
  linux1Icon: {
    top: 189,
    left: 309,
  },
  git1Icon: {
    top: 295,
    left: 307,
  },
  techDate: {
    top: 212,
    left: 151,
    fontSize: FontSize.size_13xl,
    lineHeight: 42,
//  fontFamily: FontFamily.baumansRegular,
    color: Color.textPrimary100000000,
    textAlign: "left",
    position: "absolute",
  },
  homeIndicatorChild: {
    top: 0,
  },
  homeIndicator1: {
    marginLeft: -67.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    width: 134,
    height: 5,
    left: "50%",
  },
  homeIndicator: {
    top: 776,
    opacity: 0.08,
  },
  rectangle: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: Color.mainBlack,
    borderWidth: 1,
    width: 22,
    opacity: 0.35,
    height: 11,
    top: 0,
    position: "absolute",
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
    opacity: 0.4,
    position: "absolute",
  },
  capacity: {
    top: 2,
    right: 4,
    borderRadius: 1,
    width: 18,
    height: 7,
  },
  battery: {
    top: 17,
    right: 15,
    width: 24,
    height: 11,
    position: "absolute",
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  text1: {
    letterSpacing: 0,
  },
  time: {
    marginTop: -7.5,
//  fontFamily: FontFamily.sFProText,
    top: "50%",
    color: Color.mainBlack,
    textAlign: "center",
    left: 0,
    fontWeight: "600",
    fontSize: FontSize.h614Regular_size,
    width: 54,
  },
  timeStyle: {
    top: 13,
    left: 21,
    height: 21,
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    top: "50%",
    left: "50%",
    overflow: "hidden",
  },
  topBar: {
    left: 0,
    top: 0,
  },
  view: {
    backgroundColor: Color.colorLavender_100,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});