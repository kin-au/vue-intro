// make a new vue instance (the root of a vue app) and pass an options object (with optional properties) into it
let app = new Vue({
  // el property tells vue which element is attached to this instance
  el: "#app",
  //  any data is stored inside the data property
  data: {
    product: "Welsh Hills",
    image: "./assets/wales.jpg",
    details: ["Crisp", "Westerly", "Earthy", "Hint of baa"],
    variants: [
      { id: 1, name: "Plastic bottle", image: "./assets/bottle.jpg" },
      { id: 2, name: "Balloon", image: "./assets/balloon.jpg" },
      { id: 3, name: "Envelope", image: "./assets/envelope.jpg" },
    ],
    link: "https://www.google.com/search?q=welsh+hills",
    inventory: 5,
    price: 27.99,
    onSale: true,
    basket: 0,
  },
  // any functions are stored inside the methods property
  methods: {
    updateImage(variantImage) {
      this.image = variantImage;
    },
    defaultImage() {
      this.image = "./assets/wales.jpg";
    },
    addToBasket() {
      this.basket += 1;
    },
    removeFromBasket() {
      if (this.basket > 0) {
        this.basket -= 1;
      }
    },
  },
});
