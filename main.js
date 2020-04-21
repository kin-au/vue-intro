// make a new vue instance (the root of a vue app) and pass an options object (with optional properties) into it
let app = new Vue({
  // el property tells vue which element is attached to this instance
  el: "#app",
  data: {
    product: "Welsh Hills",
    image: "./assets/wales.jpg",
    details: ["Crisp", "Westerly", "Earthy", "Hint of baa"],
    variants: [
      { id: 1, name: "Plastic container" },
      { id: 2, name: "Balloon" },
      { id: 3, name: "Envelope" },
    ],
    link: "https://www.google.com/search?q=welsh+hills",
    inventory: 5,
    price: 27.99,
    onSale: true,
  },
});
