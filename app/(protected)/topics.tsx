import { View, Text } from 'react-native'
import React from 'react'

export type StepType = 'reading' | 'video' | 'pdf' | 'assessment';

export interface CourseStep {
  id: string;
  order: number;          
  title: string;
  type: StepType;
  content?: string;       
  videoUrl?: string;      
  pdfUrl?: string;       
  questions?: {           
    question: string;
    options: string[];
    correctIndex: number;
  }[];
}
export default function Topics() {


 
   const topics =[
    {
        id: "1",
        title: "Programming",
        type: "reading",
    },
    {
        id: "2",
        title: "Design",
        type: "video",

    },
    {
        id: "3",
        title: "Marketing",
        type: "reading",

    },
    {
        id: "4",
        title: "Business",
        type: "video",

    },
    {
        id: "5",
        title: "Photography",
        type: "pdf",
    },
    {
        id: "6",
        title: "Artificial Intelligence",
        type: "assessment",
    }

   ]





  return (
    <View>
      <Text>T</Text>
    </View>
  )
}