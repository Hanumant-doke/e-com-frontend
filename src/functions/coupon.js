import axios from 'axios'

export const createCoupon = async (coupon, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/coupon`, { coupon },
        {
            headers: {
                authtoken
            }
        })
}


export const removeCoupon = async (couponId, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`,
        {
            headers: {
                authtoken
            }
        })
}


export const getCoupons = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/coupons`
    )
}