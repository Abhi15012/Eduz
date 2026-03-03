import { View, Text } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import LegendListComponent from './legendList'

export default function HorizontalList({
    data,
    numberOfItems,

    header
}:{data: any[], numberOfItems:number, header: string    
}) {



  return (
   <MotiView style={{
    height: 390,
    flex:1
   }} className="w-full " >


<Text className="font-l-semibold  text-lg dark:text-gray-200 mb-2 px-3">{header}</Text>

    <LegendListComponent
    header={header} 

    data={data}
    numberOfItems={numberOfItems}
    isHorizontal

    />



   </MotiView>
  )
}