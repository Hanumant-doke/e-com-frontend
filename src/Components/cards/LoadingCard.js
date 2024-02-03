import { Card, Skeleton } from 'antd'
import React from 'react'

export default function LoadingCard({ count }) {
    const cards = () => {
        let totalCards = []
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Card key={i}>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }
        return totalCards;
    }
    return (
        <div>
            {cards()}
        </div>
    )
}
