import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { useDiary } from "../Context/DiaryContext";
import type { CloseType } from "../types";


export const Diary: FC = () => {

    const { addDeal } = useDiary()

    const [newDeal, setNewDeal] = useState({
        date: new Date().toISOString().split('T')[0],
        instrument: '',
        openPrice: '',
        closePrice: '',
        commission: '',
        stopLoss: '',
        takeProfit:'',
        reason:'',
        emotions:'',
        closeType:'none' as CloseType,
        images:[]
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDeal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        addDeal({
            date: newDeal.date,
            instrument: newDeal.instrument,
            openPrice: Number(newDeal.openPrice) || 0,
            closePrice: Number(newDeal.closePrice) || 0,
            commission: Number(newDeal.commission) || 0,
            stopLoss: Number(newDeal.stopLoss) || 0,
            takeProfit: Number(newDeal.takeProfit) || 0,
            reason: newDeal.reason,
            emotions: newDeal.emotions,
            closeType: newDeal.closeType,
            images: newDeal.images
        })
       
        setNewDeal({
          date: new Date().toISOString().split('T')[0],
          instrument: '',
          openPrice: '',
          closePrice: '',
          commission: '',
          stopLoss: '',
          takeProfit: '',
          reason: '',
          emotions: '',
          closeType: 'none',
          images: []
        });
  };



    return (
        <section className="diary-form"> 
            <h2>Форма добавления сделки</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    Дата:
                    <input 
                        type="date"
                        name="date"
                        value={newDeal.date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Инструмент:
                    <input 
                        type="text"
                        name="instrument"
                        value={newDeal.instrument}
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
                        value={newDeal.openPrice}
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
                        value={newDeal.closePrice}
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
                        value={newDeal.commission}
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
                        value={newDeal.stopLoss}
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
                        value={newDeal.takeProfit}
                        onChange={handleChange}
                        placeholder="takeProfit"
                        step="0.01"
                        required
                    />
                </label>

                <label>
                    Причина:
                    <input 
                        type="string"
                        name="reason"
                        value={newDeal.reason}
                        onChange={handleChange}
                        placeholder="Причина"
                        required
                    />
                </label>

                <select name="closeType" value={newDeal.closeType || 'none'} onChange={handleChange}>
                    <option value="none">Не выбрано</option>
                    <option value="profit">Закрылась по Тейк-профиту</option>
                    <option value="loss">Закрылась по Стоп-Лоссу</option>
                    <option value="zero">Безубыток</option>
                    <option value="manually">Вручную</option>
                </select>

                <label>
                    Эмоции:
                    <input 
                        type="text"
                        name="emotions"
                        value={newDeal.emotions}
                        onChange={handleChange}
                        placeholder="Эмоции"
                        required
                    />
                </label>
                


                <button type="submit">Добавить сделку</button>
            </form>
        </section>
    );
};