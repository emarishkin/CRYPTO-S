import { useState, type ChangeEvent, type FC, type FormEvent } from "react";

interface Deal {
    date: string;
    instrument: string;
    openPrice: number | '';
    closePrice: number | '';
    commission: number | '';
    stopLoss:number | ''
}

export const Diary: FC = () => {
    const [addDeal, setAddDeal] = useState<Deal>({
        date: new Date().toISOString().split('T')[0],
        instrument: '',
        openPrice: '',
        closePrice: '',
        commission: '',
        stopLoss: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddDeal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="diary-form"> 
            <h2>Форма добавления сделки</h2>
            <form >
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

                <button type="submit">Добавить сделку</button>
            </form>
        </section>
    );
};