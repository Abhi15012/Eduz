import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

import Bg from '@/components/bg'
import { coursesStore } from '@/store/dataStore';
import LegendListComponent from '../_components/legendList';



export default function bookMarks() {
  
  const BookMarks = coursesStore.getState().getBookMarks();
 
console.log("`Bookmarks in bookMarks screen:`", BookMarks)
  return (
    <View className='bg-light dark:bg-dark flex-1 '>
      <Bg  />

  

      <View className="flex-1 items-center justify-center" >
    <LegendListComponent
    data={BookMarks}
    refreshing={false}  
    onRefresh={() => {}}
    numberOfItems={BookMarks.length}
    isHorizontal={false}
    header={"Bookmarked Courses"}
    />
      </View>
    

     


 </View>
  )
}
