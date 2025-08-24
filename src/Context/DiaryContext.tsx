import { createContext, useContext, useState, type FC, type ReactNode } from "react";
import { mockDeals } from "../data/data";
import type { IDeal } from "../types";

interface DiaryContextType{
   deals:IDeal[],
   addDeal:(deal:Omit<IDeal, 'id'>)=>void
   updateDeal:(id:number,deal:Partial<IDeal>)=>void
   deleteDeal:(id:number)=>void
   getDealById:(id:number)=>void
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined)



export const DiaryProvider:FC<{children:ReactNode}> = ({children}) => {

 const [deals,setDeals] = useState<IDeal[]>([...mockDeals])
 
 const addDeal = (dealData:Omit<IDeal, 'id'>) => {
   const newDeal:IDeal = {
     ...dealData,id:Date.now()
   }
   setDeals([...mockDeals,newDeal])
 }

 const updateDeal = (id:number,dealData:Partial<IDeal>) => {
   setDeals(prev => prev.map(deal => deal.id === id ? {...deal,...dealData} : deal))
 }

 const deleteDeal = (id:number) => {
   setDeals(prev => prev.filter(deal => deal.id !== id))
 }

  const getDealById = (id: number) => {
   return deals.find(deal => deal.id === id);
  };

 return (
    <DiaryContext.Provider value={{deals,addDeal,updateDeal,deleteDeal,getDealById}}>
        {children}
    </DiaryContext.Provider>
 )
}

export const useDiary = () => {
    const context = useContext(DiaryContext);
    if (context === undefined) {
        throw new Error('useDiary must be used within a DiaryProvider');
    }
    return context;
};