import type { IDeal } from "../types";

export const mockDeals: IDeal[] = [
    {
        id: 1,
        date: "2024-01-15",
        instrument: "EUR/USD",
        openPrice: 1.0850,
        closePrice: 1.0920,
        commission: 2.5,
        stopLoss: 1.0800,
        takeProfit: 1.0950,
        reason: "Пробой уровня сопротивления",
        targetPrice: 1.0930,
        emotions: "Уверенность",
        closeType: "profit",
        images: [
            {
                id: 1,
                url: "https://example.com/chart1.png",
                description: "График входа в сделку",
                createdAt: "2024-01-15T10:30:00Z"
            },
            {
                id: 2,
                url: "https://example.com/chart2.png",
                description: "График выхода из сделки",
                createdAt: "2024-01-15T15:45:00Z"
            }
        ]
    }
];