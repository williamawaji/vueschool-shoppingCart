import shop from '@/api/shop'

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        availableProducts (state, getters) {
            return state.items.filter(product => product.inventory > 0)
        },
        productIsStock () {
            return (product) => {
                return product.inventory > 0
            }
        }
    },
    mutations: {
        setProducts (state, products) {
            // update products
            state.items = products
        },
        decrementProductInventory (state, product) {
            product.inventory--
        }
    },
    actions: {
        fetchProducts ({commit}) {
            return new Promise ((resolve, reject) => {
                // make call
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        }
    }
}