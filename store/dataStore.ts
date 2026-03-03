import { set } from "zod";
import { create } from "zustand";
import { Bookmark } from "@/utils/protected/types";

interface coursesState {
    Bookmarks : Bookmark[]
    tutors : [] 
    setBookMarks : (data: Bookmark[])=> void
    getBookMarks : ()=> Bookmark[]
    setTutors : (data: [])=> void
    getTutors : ()=> []
  
}



export const coursesStore =  create<coursesState>((set,get)=>({
    Bookmarks : [],
     tutors : [],
    setBookMarks : (data)=> set({Bookmarks : data}),
    getBookMarks : ()=> get().Bookmarks,
   
    setTutors : (data )=> set({tutors : data}),
    getTutors : ()=> get().tutors

}))

