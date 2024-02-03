import React from 'react';
import StarRatings from 'react-star-ratings'

const showAverage = (p) => {
    let result = 0;
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length

        ratingsArray.map((r) => total.push(r.star))
        let totalReduced = total.reduce((p, n) => p + n, 0)

        let highest = length * 5;
        console.log(highest, 'highest');

        result = (totalReduced * 5) / highest;
        console.log(result, 'result');
    }
    return (
        <div style={{ textAlign: "center", marginBottom: '20px' }}>
            <span>
                <StarRatings
                    rating={result}
                    starDimension='20px'
                    starSpacing='2px'
                    editing={false}
                    starRatedColor="red"
                />
                <span>({p.ratings.length})</span>
            </span>
        </div>
    )
}

export default showAverage;