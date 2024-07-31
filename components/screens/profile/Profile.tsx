import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { Padding, Color, Border, FontFamily, FontSize } from "../../../GlobalStyles";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { router,Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Profile = () => {

  const [userInfo,setUserInfo] = useState<any>();

  useEffect(()=>{
    gerCurrentUser()
  },[])
  const gerCurrentUser = async()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    if(user){
      setUserInfo(user)
      console.log(JSON.stringify(userInfo,null,2))
    }else{
      console.log("Not logged in")
    }
  
  }
 

 
 
  const userSignOut = async () => {
    console.log("INsider signout")
    await signOut(auth);
    await AsyncStorage.setItem('@user',"")
    console.log("OUTsider signout")
    router.push("/")

  }
  return (
    <View style={styles.view}>
      {/* <Image
        style={styles.aroundYouIcon}
        contentFit="cover"
        source={require("../../../assets/around-you.png")}
       
      /> */}
      <View style={[styles.interest, styles.interestPosition]}>
        <View style={[styles.interest1, styles.interestPosition]}>
          <View style={[styles.category, styles.categoryBorder]}>
            <Text style={[styles.interest2, styles.interestClr]}>
              MERN App
            </Text>
          </View>
          <View style={[styles.category1, styles.categoryBorder]}>
            <Text style={[styles.interest2, styles.interestClr]}>
              Docker
            </Text>
          </View>
          <Link href={{pathname:'leaderboard'}} style={[styles.category2, styles.categoryBorder]}>
          <View style={[styles.category2]}>
            <Text style={[styles.interest2, styles.interestClr]}>
            React-Native
            </Text>
          </View>

          </Link>
          <Link href={{pathname:'chat'}} style={[styles.category3, styles.categoryBorder]}>
          <View style={[styles.category3]}>
            <Text style={[styles.interest5, styles.interestTypo]}>
            AWS 
            </Text>
          </View>
          </Link>
          <Link href={{pathname:'home'}} style={[styles.category4, styles.categoryBorder]}>
          <View style={[styles.category4]}>
            <Text style={[styles.interest2, styles.interestClr]}>
            Azure
            </Text>
          </View>
          </Link>
          <View style={[styles.category5, styles.categoryBorder]}>
            <Text style={[styles.interest2, styles.interestClr]}>
            kubernetes
            </Text>
          </View>
          <View style={[styles.category6, styles.categoryBorder]}>
            <Text style={[styles.interest8, styles.viewAllTypo]}>
              👗 Fashion
            </Text>
          </View>
        </View>
        <Text style={[styles.interest9, styles.skillsTypo]}>Skills</Text>
        <TouchableOpacity onPress={()=>userSignOut()} >
        <Text style={[styles.viewAll, styles.viewAllTypo]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.james, styles.jamesLayout]}>
        {/* Sumit */}
        <Image
          style={[styles.imageIcon, styles.jamesLayout,styles.sumit]}
          contentFit="cover"
          source={require("../../../assets/sumit.jpg")}
        />
        <View style={[styles.matchPercentage, styles.tagFlexBox]}>
          <Text style={[styles.match, styles.matchTypo]}>100% Match</Text>
        </View>
        <View style={styles.nameAgeLocation}>
          <View style={[styles.tag, styles.tagFlexBox]}>
            <Text style={[styles.kmAway, styles.kmAwayTypo]}>Love to solve Error's</Text>
          </View>
          <View style={[styles.nameAge, styles.nameAgeFlexBox]}>
            <Text style={[styles.james20, styles.matchTypo]}>{userInfo && userInfo.displayName}</Text>
            <Image
              style={styles.nameAgeChild}
              contentFit="cover"
              source={require("../../../assets/ellipse-68.png")}
            />
          </View>
          {/* <Text style={[styles.hanover, styles.kmAwayTypo]}>Love to solve Error's</Text> */}
        </View>
      </View>
      <Text style={[styles.skills, styles.skillsTypo]}>Interest</Text>
      <View style={[styles.topBar, styles.topBarLayout]}>
        <View style={[styles.topBar1, styles.topBar1Position]}>
          <View style={[styles.iphoneXstatusBarsstatusBa, styles.topBarLayout]}>
            <View style={[styles.rectangle, styles.topBar1Position]} />
            <View style={styles.battery}>
              <View style={[styles.border, styles.tagBorder]} />
              <Image
                style={styles.capIcon}
                contentFit="cover"
                source={require("../../../assets/cap.png")}
              />
              <View style={[styles.capacity, styles.capacityBg]} />
            </View>


          
          </View>
        </View>

   
<Link href="/leaderboard/index">
        <Image
          style={[styles.icon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../../../assets/icon1.png")}
          
        />

        </Link>
    
        

        
      
         
        {/* Log out */}
        <Image
          style={[styles.icon1, styles.iconLayout1]}
          contentFit="cover"
          source={require("../../../assets/icon.png")}
        />
        <View style={styles.discover}>
          <View style={styles.nameAgeFlexBox}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../../../assets/icon2.png")}
            />
            <Text style={[styles.germany, styles.matchLayout]}>Jaipur</Text>
            <Image
              style={[styles.icon3, styles.iconLayout]}
              contentFit="cover"
              source={require("../../../assets/icon3.png")}
            />
          </View>
          <Text style={[styles.discover1, styles.skillsTypo]}>Profile</Text>
        </View>
      </View>

      <View style={[styles.homeIndicator, styles.homeLayout]}>
        <View style={[styles.homeIndicatorChild, styles.homeLayout]} />
        <View style={[styles.homeIndicator1, styles.capacityBg]} />
      </View>
      {/* <Image
        style={styles.bottomNavBar}
        contentFit="cover"
        source={require("../../../assets/bottom-nav-bar5@3x.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  interestPosition: {
    width: 456,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  categoryBorder: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderColor: Color.colorDarkslateblue_100,
    backgroundColor: Color.textWhiteFFFFFF,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_13xl,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  interestClr: {
    color: Color.mainPrimary,
    textAlign: "left",
  },
  interestTypo: {
    fontFamily: FontFamily.inika,
    fontSize: FontSize.bodyMediumBold_size,
    lineHeight: 24,
  },
  viewAllTypo: {
    fontFamily: FontFamily.headingH3,
    fontWeight: "500",
    lineHeight: 24,
    fontSize: FontSize.bodyMediumBold_size,
  },
  skillsTypo: {
    fontFamily: FontFamily.interBold,
    textAlign: "left",
  },
  jamesLayout: {
    height: 232,
    width: 163,
    position: "absolute",
  },
  tagFlexBox: {
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  matchTypo: {
    color: Color.textWhiteFFFFFF,
    textAlign: "center",
    fontFamily: FontFamily.headingH3,
  },
  kmAwayTypo: {
    lineHeight: 14,
    fontSize: FontSize.bodyXXSmallCAPS_size,
    color: Color.textWhiteFFFFFF,
    fontFamily: FontFamily.headingH3,
    fontWeight: "500",
  },
  nameAgeFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  topBarLayout: {
    width: 375,
    position: "absolute",
  },
  topBar1Position: {
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  tagBorder: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  capacityBg: {
    backgroundColor: Color.mainBlack,
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "6.9%",
    top: "51.72%",
    width: "12.8%",
    height: "41.38%",
    position: "absolute",
    overflow: "hidden",
  },
  matchLayout: {
    lineHeight: 16,
    fontSize: FontSize.bodyXSmallSemiBold_size,
  },
  iconLayout: {
    height: 12,
    width: 12,
    overflow: "hidden",
  },
  homeLayout: {
    height: 36,
    width: 375,
    left: 0,
    position: "absolute",
  },
  aroundYouIcon: {
    top: 475,
    width: 343,
    height: 315,
    left: 16,
    position: "absolute",
  },
  interest2: {
    textAlign: "left",
    fontFamily: FontFamily.inika,
    fontSize: FontSize.bodyMediumBold_size,
    lineHeight: 24,
  },
  category: {
    marginLeft: -226.75,
    marginTop: -46,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderColor: Color.colorDarkslateblue_100,
    backgroundColor: Color.textWhiteFFFFFF,
  },
  category1: {
    marginLeft: -113.25,
    marginTop: -46,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderColor: Color.colorDarkslateblue_100,
    backgroundColor: Color.textWhiteFFFFFF,
  },
  category2: {
    marginTop: 6,
    marginLeft: -227.75,
  },
  interest5: {
    color: Color.textPrimary100000000,
    textAlign: "left",
  },
  category3: {
    marginLeft: -78.25,
    marginTop: 6,
  },
  category4: {
    marginLeft: 18.25,
    marginTop: 6,
  },
  category5: {
    marginLeft: -1.75,
    marginTop: -46,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderColor: Color.colorDarkslateblue_100,
    backgroundColor: Color.textWhiteFFFFFF,
  },
  interest8: {
    textAlign: "left",
    color: Color.mainPrimary,
  },
  category6: {
    marginLeft: 127.75,
    marginTop: -46,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderColor: Color.colorDarkslateblue_100,
    backgroundColor: Color.textWhiteFFFFFF,
  },
  interest1: {
    marginTop: -26,
    height: 92,
    marginLeft: -227.75,
  },
  interest9: {
    top: 6,
    left: 2,
    color: Color.mainBlack,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interBold,
    lineHeight: 24,
    position: "absolute",
  },
  viewAll: {
    left: 290,
    color: Color.mainSecondary1,
    textAlign: "right",
    top: 0,
    position: "absolute",
  },
  interest: {
    marginTop: -90,
    marginLeft: -173,
    height: 132,
  },
  imageIcon: {
    left: 0,
    top: 0,
  },
  match: {
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 16,
    fontSize: FontSize.bodyXSmallSemiBold_size,
  },
  matchPercentage: {
    height: "10.34%",
    width: "60.12%",
    right: "19.63%",
    bottom: "89.66%",
    left: "20.25%",
    borderBottomRightRadius: Border.br_base,
    borderBottomLeftRadius: Border.br_base,
    backgroundColor: Color.mainSecondary1,
    paddingHorizontal: Padding.p_base,
    top: "0%",
    paddingVertical: Padding.p_9xs,
    position: "absolute",
  },
  kmAway: {
    textAlign: "left",
  },
  tag: {
    backgroundColor: Color.colorGray_200,
    borderColor: Color.colorGray_200,
    paddingHorizontal: Padding.p_5xs,
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: Padding.p_9xs,
    borderRadius: Border.br_13xl,
  },
  james20: {
    fontSize: FontSize.h418Regular_size,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 24,
    color: Color.textWhiteFFFFFF,
  },
  nameAgeChild: {
    width: 6,
    height: 6,
    marginLeft: 4,
  },
  nameAge: {
    marginTop: 4,
  },
  hanover: {
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.7,
    marginTop: 4,
    textAlign: "center",
  },
  nameAgeLocation: {
    top: 148,
    left: 36,
    alignItems: "center",
    position: "absolute",
  },
  james: {
    top: 101,
    left: 96,
  },
  skills: {
    top: 461,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interBold,
    lineHeight: 24,
    position: "absolute",
    color: Color.textPrimary100000000,
    left: 16,
  },
  rectangle: {
    height: "100%",
    bottom: "0%",
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: Color.mainBlack,
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
  text: {
    letterSpacing: 0,
  },
  time: {
    marginTop: -7.5,
    fontSize: FontSize.h614Regular_size,
    fontFamily: FontFamily.interBold,
    textAlign: "center",
    fontWeight: "600",
    left: 0,
    color: Color.mainBlack,
    top: "50%",
  },
  timeStyle: {
    top: 13,
    left: 21,
    height: 21,
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    height: 44,
    left: "50%",
    top: "50%",
    overflow: "hidden",
  },
  topBar1: {
    height: "37.93%",
    bottom: "62.07%",
  },
  icon: {
    right: "4.27%",
    left: "82.93%",
  },
  icon1: {
    right: "21.33%",
    left: "65.87%",
    display: "none",
  },
  germany: {
    fontFamily: FontFamily.abelRegular,
    marginLeft: 4,
    color: Color.mainBlack,
    textAlign: "left",
  },
  icon3: {
    marginLeft: 4,
  },
  discover1: {
    fontSize: FontSize.h324Regular_size,
    lineHeight: 30,
    color: Color.mainBlack,
    marginTop: 6,
  },
  discover: {
    top: 56,
    left: 16,
    position: "absolute",
  },
  topBar: {
    height: 116,
    left: 0,
    top: 0,
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
  bottomNavBar: {
    top: 724,
    left: 24,
    width: 327,
    height: 64,
    position: "absolute",
  },
  view: {
    backgroundColor: Color.colorLavender_100,
   // flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  sumit:{
    borderRadius: 40
  }
});

export default Profile;