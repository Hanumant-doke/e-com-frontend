import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductListItems({ product }) {
    const { price, category, subs, shipping, color, brand, quantity, sold } = product
    return (
        <div>
            <ul>
                <li>
                    Price{" "} <span style={{ position: "absolute", right: 30 }}>$ {price}</span>
                </li>
                {category && (
                    <li>
                        Category{" "} <Link to={`/category/${category.slug}`} style={{ position: "absolute", right: 30 }}>{category.name}</Link>
                    </li>
                )}
                {subs && (
                    <li>
                        Sub Category{" "} <span style={{ position: "absolute", right: 30 }}>
                            {subs.map((s) => (
                                <Link key={s._id} to={`/sub/${s.slug}`} style={{ margin: "5px" }}>{s.name}</Link>
                            ))}
                        </span>
                    </li>)
                }
                <li>
                    Shipping{" "} <span style={{ position: "absolute", right: 30 }}>{shipping}</span>
                </li>
                <li>
                    Color{" "} <span style={{ position: "absolute", right: 30 }}>{color}</span>
                </li>
                <li>
                    Brand{" "} <span style={{ position: "absolute", right: 30 }}>{brand}</span>
                </li>
                <li>
                    Available{" "} <span style={{ position: "absolute", right: 30 }}>{quantity}</span>
                </li>
                <li>
                    Sold{" "} <span style={{ position: "absolute", right: 30 }}>{sold}</span>
                </li>
            </ul>
        </div>
    )
}
