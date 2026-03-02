import { View, Text } from 'react-native'
import React from 'react'
import { MotiText } from 'moti'

export default function Texts({
    heading,
    content
}:{
    heading: string,
    content: string
}) {
  return (
<>
 
      <MotiText
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
        className="text-xl mt-10 mx-auto font-l-semibold dark:text-dark-subtitle text-light-subtitle"
      >
        {heading}
      </MotiText>


      <MotiText
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        className="text-sm mt-4 mb-10 mx-10 text-center font-l-regular dark:text-dark-body text-light-body"
      >
        {content}
      </MotiText>
      </>
  )
}