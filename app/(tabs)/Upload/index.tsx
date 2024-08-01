import React from 'react'
import { SafeAreaView ,Text,View} from 'react-native'
import UploadPost from '@/components/screens/uploadPost/UploadPost'
import {useCustomFunction} from "../../context/techDateContext"
function index() {
  const allFunctions  = useCustomFunction()
  console.log("Insider Upload")
  console.log(allFunctions)
  return (
<SafeAreaView>
<UploadPost uploadPost={allFunctions.UploadPost}></UploadPost>
</SafeAreaView>
  )
}

export default index