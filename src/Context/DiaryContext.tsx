import { createContext, useState, type FC, type ReactNode } from "react";
import { mockDeals } from "../data/data";

interface DiaryContextType{
   historyDeal:()=>void
}

const DiaryContext = createContext<DiaryContextType>({
   historyDeal:()=>{}
})

export const DiaryProvider:FC<{children:ReactNode}> = ({children}) => {

 const [dealArr,setDealArr] = useState([...mockDeals])

 const historyDeal = () => {

 }

 return (
    <DiaryContext.Provider value={{historyDeal}}>
        {children}
    </DiaryContext.Provider>
 )
}