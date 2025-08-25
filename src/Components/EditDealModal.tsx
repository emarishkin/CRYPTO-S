import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { IDeal } from "../types";
import '../Styles/EditDealModal.css'

interface EditDealModalProps{
  deal: IDeal;
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: IDeal) => void;
}

export const EditDealModal:FC<EditDealModalProps> = ({onClose,onSave,isOpen,deal}) => {

    const [editedDeal,setEditedDeal] = useState<IDeal>(deal)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedDeal(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('commission') || 
               name.includes('stopLoss') || name.includes('takeProfit') 
               ? Number(value) || 0 
               : value
    }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(editedDeal);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Редактирование сделки</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Дата:
            <input 
              type="date"
              name="date"
              value={editedDeal.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Инструмент:
            <input 
              type="text"
              name="instrument"
              value={editedDeal.instrument}
              onChange={handleChange}
              placeholder="Инструмент"
              required
            />
          </label>

          <label>
            Цена открытия:
            <input 
              type="number"
              name="openPrice"
              value={editedDeal.openPrice}
              onChange={handleChange}
              placeholder="Цена открытия"
              step="0.01"
              required
            />
          </label>

          <label>
            Цена закрытия:
            <input 
              type="number"
              name="closePrice"
              value={editedDeal.closePrice}
              onChange={handleChange}
              placeholder="Цена закрытия"
              step="0.01"
              required
            />
          </label>

          <label>
            Комиссия:
            <input 
              type="number"
              name="commission"
              value={editedDeal.commission}
              onChange={handleChange}
              placeholder="Комиссия"
              step="0.01"
              required
            />
          </label>

          <label>
            Стоп-лосс:
            <input 
              type="number"
              name="stopLoss"
              value={editedDeal.stopLoss}
              onChange={handleChange}
              placeholder="stopLoss"
              step="0.01"
              required
            />
          </label>

          <label>
            Тейк-профит:
            <input 
              type="number"
              name="takeProfit"
              value={editedDeal.takeProfit}
              onChange={handleChange}
              placeholder="takeProfit"
              step="0.01"
              required
            />
          </label>

          <label>
            Причина:
            <textarea
              name="reason"
              value={editedDeal.reason}
              onChange={handleChange}
              placeholder="Причина"
              required
              rows={3}
            />
          </label>

          <label>
            Тип закрытия:
            <select name="closeType" value={editedDeal.closeType || 'none'} onChange={handleChange}>
              <option value="none">Не выбрано</option>
              <option value="profit">Закрылась по Тейк-профиту</option>
              <option value="loss">Закрылась по Стоп-Лоссу</option>
              <option value="zero">Безубыток</option>
              <option value="manually">Вручную</option>
            </select>
          </label>

          <label>
            Эмоции:
            <textarea
              name="emotions"
              value={editedDeal.emotions}
              onChange={handleChange}
              placeholder="Эмоции"
              required
              rows={3}
            />
          </label>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Отмена
            </button>
            <button type="submit" className="save-btn">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}