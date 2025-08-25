import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { useDiary } from "../Context/DiaryContext";
import type { CloseType } from "../types";
import '../Styles/Diary.css'

export const Diary: FC = () => {
    const { addDeal } = useDiary();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newDeal, setNewDeal] = useState({
        date: new Date().toISOString().split('T')[0],
        instrument: '',
        openPrice: '',
        closePrice: '',
        commission: '',
        stopLoss: '',
        takeProfit: '',
        reason: '',
        emotions: '',
        closeType: 'none' as CloseType,
        images: []
    });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!newDeal.instrument.trim()) {
            newErrors.instrument = 'Инструмент обязателен';
        }
        
        if (!newDeal.openPrice || Number(newDeal.openPrice) <= 0) {
            newErrors.openPrice = 'Цена открытия должна быть больше 0';
        }
        
        if (!newDeal.closePrice || Number(newDeal.closePrice) <= 0) {
            newErrors.closePrice = 'Цена закрытия должна быть больше 0';
        }
        
        if (Number(newDeal.openPrice) > 0 && Number(newDeal.closePrice) > 0) {
            if (Number(newDeal.stopLoss) > Number(newDeal.openPrice)) {
                newErrors.stopLoss = 'Стоп-лосс не может быть выше цены открытия для лонга';
            }
            
            if (Number(newDeal.takeProfit) < Number(newDeal.openPrice)) {
                newErrors.takeProfit = 'Тейк-профит не может быть ниже цены открытия для лонга';
            }
        }
        
        if (!newDeal.reason.trim()) {
            newErrors.reason = 'Укажите причину входа';
        }
        
        if (!newDeal.emotions.trim()) {
            newErrors.emotions = 'Опишите ваши эмоции';
        }
        
        if (newDeal.closeType === 'none') {
            newErrors.closeType = 'Выберите тип закрытия';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewDeal(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            await addDeal({
                date: newDeal.date,
                instrument: newDeal.instrument.trim(),
                openPrice: Number(newDeal.openPrice) || 0,
                closePrice: Number(newDeal.closePrice) || 0,
                commission: Number(newDeal.commission) || 0,
                stopLoss: Number(newDeal.stopLoss) || 0,
                takeProfit: Number(newDeal.takeProfit) || 0,
                reason: newDeal.reason.trim(),
                emotions: newDeal.emotions.trim(),
                closeType: newDeal.closeType,
                images: newDeal.images
            });
     
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
            
            setErrors({});
            
        } catch (error) {
            console.error('Ошибка при добавлении сделки:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateProfit = () => {
        if (!newDeal.openPrice || !newDeal.closePrice) return 0;
        const open = Number(newDeal.openPrice);
        const close = Number(newDeal.closePrice);
        return (close - open).toFixed(2);
    };

    const profit = calculateProfit();
    const isProfit = Number(profit) > 0;

    return (
        <section className="diary-form"> 
            <div className="form-header">
                <h2>📊 Форма добавления сделки</h2>
                <div className={`profit-preview ${isProfit ? 'positive' : 'negative'}`}>
                    Прибыль: {profit}$
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className={errors.date ? 'error' : ''}>
                        Дата:
                        <input 
                            type="date"
                            name="date"
                            value={newDeal.date}
                            onChange={handleChange}
                            required
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                    </label>

                    <label className={errors.instrument ? 'error' : ''}>
                        Инструмент:
                        <input 
                            type="text"
                            name="instrument"
                            value={newDeal.instrument}
                            onChange={handleChange}
                            placeholder="Например: AAPL, BTC/USD"
                            required
                        />
                        {errors.instrument && <span className="error-text">{errors.instrument}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label className={errors.openPrice ? 'error' : ''}>
                        Цена открытия:
                        <input 
                            type="number"
                            name="openPrice"
                            value={newDeal.openPrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.0001"
                            min="0"
                            required
                        />
                        {errors.openPrice && <span className="error-text">{errors.openPrice}</span>}
                    </label>

                    <label className={errors.closePrice ? 'error' : ''}>
                        Цена закрытия:
                        <input 
                            type="number"
                            name="closePrice"
                            value={newDeal.closePrice}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.0001"
                            min="0"
                            required
                        />
                        {errors.closePrice && <span className="error-text">{errors.closePrice}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Комиссия:
                        <input 
                            type="number"
                            name="commission"
                            value={newDeal.commission}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </label>

                    <label className={errors.closeType ? 'error' : ''}>
                        Тип закрытия:
                        <select 
                            name="closeType" 
                            value={newDeal.closeType} 
                            onChange={handleChange}
                        >
                            <option value="none">Не выбрано</option>
                            <option value="profit">Закрылась по Тейк-профиту</option>
                            <option value="loss">Закрылась по Стоп-Лоссу</option>
                            <option value="zero">Безубыток</option>
                            <option value="manually">Вручную</option>
                        </select>
                        {errors.closeType && <span className="error-text">{errors.closeType}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label className={errors.stopLoss ? 'error' : ''}>
                        Стоп-лосс:
                        <input 
                            type="number"
                            name="stopLoss"
                            value={newDeal.stopLoss}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.0001"
                            min="0"
                        />
                        {errors.stopLoss && <span className="error-text">{errors.stopLoss}</span>}
                    </label>

                    <label className={errors.takeProfit ? 'error' : ''}>
                        Тейк-профит:
                        <input 
                            type="number"
                            name="takeProfit"
                            value={newDeal.takeProfit}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.0001"
                            min="0"
                        />
                        {errors.takeProfit && <span className="error-text">{errors.takeProfit}</span>}
                    </label>
                </div>

                <label className={errors.reason ? 'error' : ''}>
                    Причина входа в сделку:
                    <textarea
                        name="reason"
                        value={newDeal.reason}
                        onChange={handleChange}
                        placeholder="Опишите почему вы вошли в сделку..."
                        rows={3}
                        required
                    />
                    {errors.reason && <span className="error-text">{errors.reason}</span>}
                </label>

                <label className={errors.emotions ? 'error' : ''}>
                    Эмоции во время сделки:
                    <textarea
                        name="emotions"
                        value={newDeal.emotions}
                        onChange={handleChange}
                        placeholder="Опишите ваши эмоции во время сделки..."
                        rows={3}
                        required
                    />
                    {errors.emotions && <span className="error-text">{errors.emotions}</span>}
                </label>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={isSubmitting ? 'submitting' : ''}
                >
                    {isSubmitting ? 'Добавление...' : '✅ Добавить сделку'}
                </button>
            </form>
        </section>
    );
};