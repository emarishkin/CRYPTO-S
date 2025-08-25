import { useState, type FC } from "react";
import { useDiary } from "../Context/DiaryContext";
import '../Styles/DealHistoryPage.css'
import type { IDeal } from "../types";
import { EditDealModal } from "../Components/EditDealModal";

export const DealHistoryPage:FC = () => {

    const {deals,deleteDeal,updateDeal} = useDiary()
    const [editingDeal, setEditingDeal] = useState<IDeal | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const calcProfit = (deal: IDeal) => {
        const profit = (Number(deal.closePrice) - Number(deal.openPrice))
        return profit.toFixed(2)
    }

    const handleEdit = (deal: IDeal) => {
      setEditingDeal(deal)
      setIsModalOpen(true)
    }

    const handleSave = (updatedDeal: IDeal) => {
       updateDeal(updatedDeal.id, updatedDeal)
       setIsModalOpen(false)
       setEditingDeal(null)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingDeal(null)
    }

    return (
        <section className="dealHistorySection">
           <h1>История Сделок</h1>
           {deals.length === 0 ? (
             <p className="no-deals">Сделок пока нет</p>
           ) : (
             deals.map(deal => (
              <div key={deal.id} className="card-deal">
                  <div className="header-dealCard">
                      <h3>{deal.instrument}</h3>
                      <span className={`Profit ${Number(deal.closePrice) > Number(deal.openPrice) ? 'positive' : 'negative'}`}>
                          {calcProfit(deal)}
                      </span>
                  </div>
                  <div className="deal-details">
                    <p>Дата: {deal.date}</p>
                    <p>Открытие: {deal.openPrice}</p>
                    <p>Закрытие: {deal.closePrice}</p>
                    <p>Причина: {deal.reason}</p>
                    <p>Тип закрытия: {deal.closeType}</p>
                  </div>
                  <div className="deal-actions">
                    <button className="edit-btn" onClick={() => handleEdit(deal)}>
                      Редактировать
                    </button>
                    <button className="delete-btn" onClick={() => deleteDeal(deal.id)}>
                      Удалить
                    </button>
                  </div>
              </div>
             ))
           )}

           {editingDeal && (
             <EditDealModal 
              onClose={handleCloseModal}
              onSave={handleSave}
              isOpen={isModalOpen}
              deal={editingDeal}
             />
           )}
        </section>
    )
}