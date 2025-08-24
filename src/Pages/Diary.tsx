import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { IDeal } from "../types";


export const Diary: FC = () => {
    
    const [mockDeals,setMockDeals] = useState<IDeal[]>([])
    const [addDeal, setAddDeal] = useState<Partial<IDeal>>({
        date: new Date().toISOString().split('T')[0],
        instrument: '',
        openPrice: '',
        closePrice: '',
        commission: '',
        stopLoss: '',
        takeProfit:'',
        reason:'',
        targetPrice:'',
        emotions:'',
        closeType:'none',
        images:[]
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddDeal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const newDeal:IDeal = {
            id:Date.now(),
            date:addDeal.date as string,
            instrument:addDeal.instrument as string,
            openPrice:addDeal.openPrice as 0,
            closePrice:addDeal.closePrice  as 0,
            commission:addDeal.commission  as 0,
            stopLoss:addDeal.stopLoss  as 0,
            takeProfit:addDeal.takeProfit  as 0,
            reason:addDeal.reason as string,
            targetPrice:addDeal.targetPrice as 0,
            emotions:addDeal.emotions as string,
            closeType:addDeal.closeType as 'none' | 'profit' | 'loss' | 'zero' | 'manually',
            images:addDeal.images || []

        }
       
        setMockDeals([...mockDeals,newDeal])

    }

    return (
        <section className="diary-form"> 
            <h2>Форма добавления сделки</h2>
            <form onSubmit={handleSubmit} >
                <label>
                    Дата:
                    <input 
                        type="date"
                        name="date"
                        value={addDeal.date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Инструмент:
                    <input 
                        type="text"
                        name="instrument"
                        value={addDeal.instrument}
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
                        value={addDeal.openPrice}
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
                        value={addDeal.closePrice}
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
                        value={addDeal.commission}
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
                        value={addDeal.stopLoss}
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
                        value={addDeal.takeProfit}
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
                        value={addDeal.reason}
                        onChange={handleChange}
                        placeholder="Причина"
                        required
                    />
                </label>

                 <label>
                    Цена входа:
                    <input 
                        type="number"
                        name="targetPrice"
                        value={addDeal.targetPrice}
                        onChange={handleChange}
                        placeholder="targetPrice"
                        step="0.01"
                        required
                    />
                </label>

                <select name="closeType" value={addDeal.closeType || 'none'} onChange={handleChange}>
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
                        value={addDeal.emotions}
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