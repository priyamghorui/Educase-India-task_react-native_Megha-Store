import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = ({navigation}:any) => {
  return (
    <>
      <TouchableOpacity style={{   padding: 6}} onPress={()=>{navigation.goBack()}}>
            <Ionicons name="chevron-back" size={24} color="#111827" />
          </TouchableOpacity>
    </>
  )
}

export default BackButton