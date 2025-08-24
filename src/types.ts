export interface IDeal {
    id: number;
    date: string;
    instrument: string;
    openPrice: number;
    closePrice: number;
    commission: number;
    stopLoss: number;
    takeProfit: number;
    reason: string;
    emotions: string;
    closeType: CloseType;
    images: IImage[];
}

export interface IImage {
    id: number;
    url: string;
    description: string;
    createdAt: string;
}

export type CloseType = 'none' | 'profit' | 'loss' | 'zero' | 'manually';