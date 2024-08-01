import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize } from "../../../GlobalStyles";

const LeaderBoard = () => {
  return (
    <View style={styles.view}>
      <View style={styles.maskWrapper}>
        <View style={[styles.mask, styles.maskBg]} />
      </View>
      <View style={styles.topBar}>
        <View style={[styles.rectangle, styles.topBar1Position]} />
        {/* <Image
          style={[styles.backIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/back.png")}
        
        /> */}
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/icon4.png")}
        />
        <Text style={styles.headline}>LeaderBoard</Text>
        <View style={[styles.topBar1, styles.topBar1Position]}>
          <View style={styles.iphoneXstatusBarsstatusBa}>
            <View style={[styles.rectangle1, styles.containerPosition]} />
            <View style={styles.battery}>
              <View style={[styles.border, styles.borderBorder]} />
              <Image
                style={styles.capIcon}
                contentFit="cover"
                source={require("../../../assets/cap.png")}
              />
              {/* <View style={[styles.capacity, styles.capacityBg]} /> */}
            </View>
         
            {/* <Image
              style={styles.cellularConnectionIcon}
              contentFit="cover"
              source={require("../../../assets/cellular-connection.png")}
            /> */}
            {/* <View style={styles.timeStyle}>
              <Text style={styles.time}>
                <Text style={styles.text}>9:4</Text>1
              </Text>
            </View> */}
          </View>
        </View>
      </View>
      <View style={styles.inputSearch}>
        <View style={[styles.rectangle1, styles.containerPosition]}>
          <View style={[styles.container, styles.borderBorder]} />
          <Text style={styles.search}>Search</Text>
          <Image
            style={styles.searchIcon}
            contentFit="cover"
            source={require("../../../assets/search.png")}
          />
        </View>
      </View>
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon1, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon2, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon3, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon4, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon5, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <View style={[styles.child, styles.childLayout]} />
      <Text style={[styles.eddie, styles.tomTypo]}>Nikhil</Text>
      <Image
        style={[styles.dollar1Icon, styles.iconPosition6]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar2Icon, styles.iconPosition6]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text1, styles.textTypo]}>9999</Text>
      <Image
        style={[styles.ce493B2544b2d8ba4D12c080d6Icon6, styles.ce493IconLayout]}
        contentFit="cover"
        source={require("../../../assets/145857007-307ce493b2544b2d8ba4d12c080d6651-1.png")}
      />
      <View style={[styles.item, styles.itemPosition]} />
      <Text style={[styles.alen, styles.itemPosition]}>Sumit</Text>
      <Image
        style={[styles.dollar13Icon, styles.iconPosition5]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar14Icon, styles.iconPosition5]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text2, styles.textTypo]}>10000</Text>
      <View style={[styles.inner, styles.innerPosition]} />
      <Image
        style={[styles.dollar3Icon, styles.iconPosition4]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar4Icon, styles.iconPosition4]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text3, styles.textTypo]}>4444</Text>
      <View style={[styles.rectangleView, styles.tomPosition]} />
      <Image
        style={[styles.dollar5Icon, styles.iconPosition3]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar6Icon, styles.iconPosition3]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text4, styles.textTypo]}>7777</Text>
      <View style={[styles.child1, styles.child1Position]} />
      <Image
        style={[styles.dollar7Icon, styles.iconPosition2]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar8Icon, styles.iconPosition2]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text5, styles.textTypo]}>8888</Text>
      <View style={[styles.child2, styles.candyPosition]} />
      <Image
        style={[styles.dollar9Icon, styles.iconPosition1]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar10Icon, styles.iconPosition1]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text6, styles.textTypo]}>6666</Text>
      <View style={[styles.child3, styles.jackPosition]} />
      <Image
        style={[styles.dollar11Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Image
        style={[styles.dollar12Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../../../assets/dollar-1.png")}
      />
      <Text style={[styles.text7, styles.textTypo]}>5555</Text>
      <Text style={[styles.bradon, styles.child1Position]}>Prajwal</Text>
      <Text style={[styles.tom, styles.tomPosition]}>Arif</Text>
      <Text style={[styles.candy, styles.candyPosition]}>Bhupesh</Text>
      <Text style={[styles.jack, styles.jackPosition]}>Anurag</Text>
      <Text style={[styles.rockey, styles.innerPosition]}>Anamika</Text>
      <View style={[styles.homeIndicator, styles.homeLayout]}>
        <View style={[styles.homeIndicatorChild, styles.homeLayout]} />
        <View style={[styles.homeIndicator1, styles.capacityBg]} />
      </View>
      {/* <Image
        style={styles.bottomNavBar}
        contentFit="cover"
        source={require("../../../assets/bottom-nav-bar4.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  maskBg: {
    display: "none",
    backgroundColor: Color.textWhiteFFFFFF,
  },
  topBar1Position: {
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    height: 40,
    width: 40,
    top: 52,
    position: "absolute",
  },
  containerPosition: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  capacityBg: {
    backgroundColor: Color.mainBlack,
    position: "absolute",
  },
  ce493IconLayout: {
    height: 60,
    width: 60,
    borderRadius: Border.br_40xl,
    left: 21,
    position: "absolute",
  },
  childLayout: {
    height: 31,
    width: 126,
    left: 98,
  },
  tomTypo: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  iconPosition6: {
    top: 258,
    height: 60,
    width: 60,
    position: "absolute",
  },
  textTypo: {
    lineHeight: 33,
    fontSize: FontSize.size_3xl,
    left: 312,
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    textAlign: "left",
    position: "absolute",
  },
  itemPosition: {
    top: 202,
    position: "absolute",
  },
  iconPosition5: {
    top: 187,
    height: 60,
    width: 60,
    position: "absolute",
  },
  innerPosition: {
    top: 662,
    position: "absolute",
  },
  iconPosition4: {
    top: 647,
    height: 60,
    width: 60,
    position: "absolute",
  },
  tomPosition: {
    top: 431,
    position: "absolute",
  },
  iconPosition3: {
    top: 416,
    height: 60,
    width: 60,
    position: "absolute",
  },
  child1Position: {
    top: 353,
    position: "absolute",
  },
  iconPosition2: {
    top: 338,
    height: 60,
    width: 60,
    position: "absolute",
  },
  candyPosition: {
    top: 513,
    position: "absolute",
  },
  iconPosition1: {
    top: 498,
    height: 60,
    width: 60,
    position: "absolute",
  },
  jackPosition: {
    top: 587,
    position: "absolute",
  },
  iconPosition: {
    top: 572,
    height: 60,
    width: 60,
    position: "absolute",
  },
  homeLayout: {
    height: 36,
    width: 375,
    left: 0,
    position: "absolute",
  },
  mask: {
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderRadius: 7,
    borderColor: Color.colorGray_100,
    borderWidth: 0.5,
    width: 109,
    height: 35,
    borderStyle: "solid",
    display: "none",
    position: "absolute",
  },
  maskWrapper: {
    top: "16.75%",
    left: "64.8%",
    width: 0,
    height: 0,
    position: "absolute",
  },
  rectangle: {
    height: "92.61%",
    bottom: "7.39%",
    display: "none",
    backgroundColor: Color.textWhiteFFFFFF,
  },
  backIcon: {
    left: 24,
  },
  icon: {
    left: 319,
  },
  headline: {
    top: 56,
    left: 117,
    fontSize: FontSize.h324Regular_size,
    fontFamily: FontFamily.baloo,
    textAlign: "center",
    color: Color.mainBlack,
    lineHeight: 30,
    position: "absolute",
  },
  rectangle1: {
    position: "absolute",
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: Color.mainBlack,
    width: 22,
    opacity: 0.35,
    height: 11,
    top: 0,
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
    fontWeight: "600",
    fontFamily: FontFamily.sFProText,
    fontSize: FontSize.h614Regular_size,
    width: 54,
    top: "50%",
    textAlign: "center",
    color: Color.mainBlack,
    left: 0,
    position: "absolute",
  },
  timeStyle: {
    top: 13,
    height: 21,
    width: 54,
    left: 21,
    position: "absolute",
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    height: 44,
    left: "50%",
    top: "50%",
    width: 375,
    position: "absolute",
    overflow: "hidden",
  },
  topBar1: {
    height: "47.83%",
    bottom: "52.17%",
  },
  topBar: {
    height: 92,
    width: 375,
    left: 0,
    top: 0,
    position: "absolute",
  },
  container: {
    borderRadius: Border.br_mini,
    borderColor: Color.borderE8E6EA,
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    backgroundColor: Color.textWhiteFFFFFF,
    borderWidth: 1,
  },
  search: {
    marginTop: -10,
    left: 51,
    lineHeight: 21,
    fontFamily: FontFamily.h324Regular,
    color: Color.textPrimary40000000,
    textAlign: "left",
    fontSize: FontSize.h614Regular_size,
    top: "50%",
    position: "absolute",
  },
  searchIcon: {
    top: 14,
    left: 20,
    width: 20,
    height: 20,
    position: "absolute",
  },
  inputSearch: {
    height: "5.91%",
    width: "78.67%",
    top: "13.67%",
    right: "10.67%",
    bottom: "80.42%",
    left: "10.67%",
    position: "absolute",
  },
  ce493B2544b2d8ba4D12c080d6Icon: {
    top: 257,
  },
  ce493B2544b2d8ba4D12c080d6Icon1: {
    top: 334,
  },
  ce493B2544b2d8ba4D12c080d6Icon2: {
    top: 414,
  },
  ce493B2544b2d8ba4D12c080d6Icon3: {
    top: 491,
  },
  ce493B2544b2d8ba4D12c080d6Icon4: {
    top: 568,
  },
  ce493B2544b2d8ba4D12c080d6Icon5: {
    top: 645,
  },
  child: {
    top: 273,
    position: "absolute",
  },
  eddie: {
    top: 273,
    position: "absolute",
  },
  dollar1Icon: {
    left: 188,
  },
  dollar2Icon: {
    left: 207,
  },
  text1: {
    top: 270,
  },
  ce493B2544b2d8ba4D12c080d6Icon6: {
    top: 182,
  },
  item: {
    height: 31,
    width: 126,
    left: 98,
  },
  alen: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  dollar13Icon: {
    left: 188,
  },
  dollar14Icon: {
    left: 207,
  },
  text2: {
    top: 199,
  },
  inner: {
    height: 31,
    width: 126,
    left: 98,
  },
  dollar3Icon: {
    left: 188,
  },
  dollar4Icon: {
    left: 207,
  },
  text3: {
    top: 659,
  },
  rectangleView: {
    height: 31,
    width: 126,
    left: 98,
  },
  dollar5Icon: {
    left: 188,
  },
  dollar6Icon: {
    left: 207,
  },
  text4: {
    top: 428,
  },
  child1: {
    height: 31,
    width: 126,
    left: 98,
  },
  dollar7Icon: {
    left: 188,
  },
  dollar8Icon: {
    left: 207,
  },
  text5: {
    top: 350,
  },
  child2: {
    height: 31,
    width: 126,
    left: 98,
  },
  dollar9Icon: {
    left: 188,
  },
  dollar10Icon: {
    left: 207,
  },
  text6: {
    top: 510,
  },
  child3: {
    height: 31,
    width: 126,
    left: 98,
  },
  dollar11Icon: {
    left: 188,
  },
  dollar12Icon: {
    left: 207,
  },
  text7: {
    top: 584,
  },
  bradon: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  tom: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  candy: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  jack: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
  },
  rockey: {
    color: Color.textPrimary100000000,
    fontFamily: FontFamily.inika,
    fontSize: FontSize.size_xl,
    left: 101,
    textAlign: "left",
    lineHeight: 30,
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
    width: 327,
    height: 64,
    left: 24,
    position: "absolute",
  },
  view: {
    backgroundColor: Color.colorLavender_100,
   // flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default LeaderBoard;