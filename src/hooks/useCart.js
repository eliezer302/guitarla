import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db.js"

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [guitars] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_GUITARS = 1
    const MAX_GUITARS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        
        if(itemExist === -1) {
            item.qty = 1
            setCart([...cart, item])
        } else if(itemExist !== -1 && cart[itemExist].qty < MAX_GUITARS) {
            const updatedCart = [...cart]
            updatedCart[itemExist].qty++
            setCart(updatedCart)
        }
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.qty > MIN_GUITARS) {
                return {
                    ...item,
                    qty: item.qty - 1
                }
            }
            return item
        })

        setCart(updatedCart)
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.qty < MAX_GUITARS) {
                return {
                    ...item,
                    qty: item.qty + 1
                }
            }
            return item
        })

        setCart(updatedCart)
    }

    function deleteFromCart(id) {
        setCart(prevCart => prevCart.filter( guitar => guitar.id !== id ))
    }

    function cleanCart() {
        setCart([])
    }

    // State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.qty * item.price), 0), [cart])

    return { guitars, cart, addToCart, deleteFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal }
}
