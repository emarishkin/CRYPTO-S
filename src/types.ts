export interface IDeal {
    id: number;
    date: string;
    instrument: string;
    openPrice: number | '';
    closePrice: number | '';
    commission: number | '';
    stopLoss: number | '';
    takeProfit: number | '';
    reason: string;
    targetPrice: number | '';
    emotions: string;
    closeType: 'none' | 'profit' | 'loss' | 'zero' | 'manually';
    images:IImage[]
}

interface IImage {
    id: number;
    url: string;
    description: string;
    createdAt: string;
}