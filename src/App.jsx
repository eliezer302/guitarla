import Header from "./components/Header"
import Guitar from "./components/Guitar"

import { useCart } from "./hooks/useCart.js"

function App() {

    const { guitars, cart, addToCart, deleteFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal } = useCart()

    return (
        <>

        {/* Header */}
        <Header
            cart = {cart}
            decreaseQuantity = {decreaseQuantity}
            increaseQuantity = {increaseQuantity}
            deleteFromCart = {deleteFromCart}
            cleanCart = {cleanCart}
            isEmpty={isEmpty}
            cartTotal={cartTotal}
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
