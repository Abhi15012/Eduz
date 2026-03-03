import { create } from "zustand";
import { storage } from "@/constants/storage";


type themeState= {
    isDark : boolean
    toggleTheme : ()=> void
}

    const storedTheme =  storage.getString("theme")
    console.log("Stored theme:", storedTheme) 
    const isDarkTheme = storedTheme ? JSON.parse(storedTheme):false

export const themeStore =create<themeState> ((set, get)=>({
  isDark : isDarkTheme,

  toggleTheme : ()=>{
    const currentTheme =get().isDark
    
    set({isDark : !currentTheme})
    storage.set("theme", JSON.stringify(!currentTheme))
  }

}))