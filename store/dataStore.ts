import { set } from "zod";
import { create } from "zustand";

interface coursesState {
   
    tutors : [] 
courses : []
    setCourses : (data: [])=> void
    getCourses : ()=> []
    setTutors : (data: [])=> void
    getTutors : ()=> []
  
}



export const coursesStore =  create<coursesState>((set,get)=>({
  
     tutors : [],
        courses : [],
    setCourses : (data )=> set({courses : data}),
    getCourses : ()=> get().courses,
    setTutors : (data )=> set({tutors : data}),
    getTutors : ()=> get().tutors

}))

