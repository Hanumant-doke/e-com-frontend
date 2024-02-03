import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingToRedirect() {
    const [count, setCount] = useState(5)
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        if (count === 0) {
            clearInterval(interval);
            navigate('/');
        }

        return () => clearInterval(interval)
    }, [count])
    return (
        <div style={{ direction: 'inherit', padding: "5px", textAlign: 'center' }}>
            <p> Redirecting you in {count} seconds</p>
        </div>
    )
}
