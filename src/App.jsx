import { useState, useEffect } from "react"

import Header from "./components/Header"
import Guitar from "./components/Guitar"

import { db } from "./data/db.js"

function App() {

    const [guitars, setGuitars] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        
        if(itemExist === -1) {
            item.qty = 1
            setCart([...cart, item])
        } else {
            const updatedCart = [...cart]
            updatedCart[itemExist].qty++
            setCart(updatedCart)
        }
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id === id) {
                return {
                    ...item,
                    qty: item.qty + 1
                }
            }
            return item
        })

        setCart(updatedCart)
    }

    function removeFromCart(item) {
        const cartItem = cart.findIndex((guitar) => guitar.id === item.id)

        const updateCart = [...cart]
        if(updateCart[cartItem].qty === 1) {
            setCart(prevCart => prevCart.filter( guitar => guitar.id !== updateCart[cartItem].id ))
        } else {
            updateCart[cartItem].qty--
            setCart(updateCart)
        }
    }

    function deleteFromCart(id) {
        setCart(prevCart => prevCart.filter( guitar => guitar.id !== id ))
    }

    return (
        <>

        {/* Header */}
        <Header
            cart = {cart}
            increaseQuantity = {increaseQuantity}
            removeFromCart = {removeFromCart}
            deleteFromCart = {deleteFromCart}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {guitars.map((guitar) => (
                    <Guitar
                        key = {guitar.id}
                        guitar = {guitar}
                        addToCart = {addToCart}
                    />
                ))}
            </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
  )
}

export default App
