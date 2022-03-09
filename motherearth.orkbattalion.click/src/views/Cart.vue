<template>
    <div class="wrapper">
        <div class="products">
            <div class="product" v-for="product in getCart" :key="product.id">
                <div class = "info">
                    <h1>{{product.name}}</h1>
                    <p>{{product.country}}</p>
                </div>
                <div class="image">
                    <img :src="'/images/products/' +product.image">
                </div>
                <div class="price">
                    <h2>{{product.price}}</h2>
                    <button v-on:click="removeFromCart(product)" class="auto">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CartVue',
    methods: {
        removeFromCart(product) {
            const index = this.$root.$data.cart.indexOf(product);
            if (index > -1) {
                this.$root.$data.cart.splice(index, 1);
            }
        }
    },
    computed: {
        getCart() {
            return this.$root.$data.cart;
        }
    }
}

</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.products {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.product {
    margin: 10px;
    margin-top: 50px;
    width: 100%;
    display: flex;
    
}
.product img {
    border: 2px solid #333;
    height: 80px;
    width: 80px;
    object-fit: cover;
}

.info {
    background: #F2921D;
    color: #000;
    padding: 10px 30px;
    height: 80px;
    width: 200px;
}

.info h1 {
    font-size: 16px;
}

.info h2 {
    font-size: 14px;
}

.info p {
    margin: 0px;
    font-size: 10px;
}

.price {
    display: flex;
    justify-content: center;
    vertical-align: center;
}
.price h2 {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
}

button {
    height: 80px;
    background: rgb(150, 15, 15);
    color: white;
    border: none;
}

.auto {
    margin-left: auto;
}
</style>