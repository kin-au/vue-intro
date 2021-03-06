// modularise code using re-usable components
// a new component takes two arguments; the name, and options object
Vue.component("item", {
  // pass in data from app instance using props object, specifying type/required/default
  // can also pass in as an array of props without specifying the above
  props: {
    basket: {
      type: Array,
      required: true,
    },
    premiumuser: {
      type: Boolean,
      required: true,
      // can also give it a default property like below
      // default: false,
    },
  },
  // here using template literal (backticks) to construct a html template
  template: `<div>
<div class="product">
  <div class="product-title">
    <!-- inside the curly braces is an expression to display app's data -->
    <!-- product comes from a "computed" property -->
    <h2>{{ product }}</h2>
  </div>
  <div class="product-image">
    <!-- the v-bind directive dynamically connects the html attribute with the expression in "quotes", therefore with the instance's data -->
    <!-- the alias/shorthand is to remove "v-bind" entirely and just have ":src=" -->
    <img class="product-image-tag" v-bind:src="image" />
  </div>
  <div class="product-description">
    <h3>Product description:</h3>
    <ul>
      <!-- "v-for" is for displaying an array of elements -->
      <!-- the "details" alias refers to the array of data -->
      <!-- "detail" refers to each element in details and must match the expression in moustaches -->
      <!-- note it's highly recommended to have a unique "v-bind:key" for each element -->
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    <p>Available in:</p>
    <div class="variants-container">
      <!-- example of v-for with :key, using img tag -->
      <!-- v-on creates an event listener -->
      <!-- bind class of variantSelected to boolean value in data (isVariantSelected) -->
      <!-- can bind more than one class using a class object (declare obj in data), or an array of classes -->
      <!-- can also bind class conditionally using a ternary operator -->
      <figure
        class="variant"
        v-for="variant in variants"
        v-on:mouseover="updateImage(variant.image)"
        v-on:mouseout="defaultImage()"
        v-on:click="selectVariant(variant.id)"
        :class="{ variantSelected: variant.isVariantSelected }"
      >
        <!-- :class="{ disabledButton: !inventory }" -->
        <!-- using :style= to change the border color (stored in data obj) -->
        <!-- note need to put style properties as object { } -->
        <img
          class="variants-image"
          :src="variant.image"
          :alt="variant.name"
          :key="variant.id"
          :style="{ 'border': 'solid ' + variant.color + ' 2px'}"
        />
        <figcaption>
          {{ variant.name }}
        </figcaption>
      </figure>
    </div>

    <a target="_blank" :href="link">Click here for more details</a>
  </div>
  <div class="product-price">
    <p>£{{ price }}</p>
    <p>Delivery: {{ delivery }}</p>
    <!-- using v-show to conditionally show element -->
    <!-- if false, vue gives the element "display:none" css property -->
    <!-- more performant than adding/removing element from the DOM entirely -->
    <p v-show="onSale">ClAirance sale!</p>
  </div>
  <div class="product-stock">
    <!-- using v-if/else-if/else for conditional rendering of elements -->
    <p v-if="inventory > 5">In stock</p>
    <p v-else-if="inventory <= 5 && inventory > 0">
      Only {{inventory}} airs remaining
    </p>
    <!-- could also remove "inventory" from the v-else and it will still work -->
    <!-- the else condition seems to work because of nesting (if I move it outside of the parent div, it no longer renders at all) -->
    <p v-else="inventory">Out of stock</p>
  </div>
</div>
<div class="shopping">
  <!-- shorthand version of "v-on:" is "@" -->
  <!-- can bind the disabled attribute to the inventory data with :disabled="" -->
  <!-- bind the disabledButton class with inventory data -->
  <!-- alternative is to just use button:disabled pseudo-class in css -->
  <button
    @click="addToBasket()"
    class="addBasket"
    :class="{ disabledButton: !inventory }"
    :disabled="!inventory"
  >
    Add to Basket
  </button>
  <button
    @click="removeFromBasket()"
    class="removeBasket"
  >
    Remove from Basket
  </button>
</div>
<div>
  <p>Reviews from customers:</p>
  <ul>
    <p v-if="review.length === 0">No reviews yet - be the first to comment!</p>
    <li v-else v-for="userReview in review">{{ userReview.name }} said: "{{ userReview.comment }}"</li>
  </ul>
</div>
<!-- below is rendering the item-review component from within item component -->
<item-review @submit-review="submitReview"></item-review>
</div>`,
  // if we had put all the data into the instance object, it would be an object
  // however in a component, data is not an object, but a function that returns an object
  // this is for scoping and ensures that properties of data object does not leak
  data() {
    return {
      //  any data is stored inside the data here
      area: "Welsh",
      location: "Hills",
      image: "./assets/wales.jpg",
      details: ["Crisp", "Westerly", "Earthy", "Hint of baa"],
      variants: [
        {
          id: 0,
          name: "Plastic bottle",
          image: "./assets/bottle.jpg",
          color: "red",
          isVariantSelected: false,
        },
        {
          id: 1,
          name: "Balloon",
          image: "./assets/balloon.jpg",
          color: "blue",
          isVariantSelected: false,
        },
        {
          id: 2,
          name: "Envelope",
          image: "./assets/envelope.jpg",
          color: "green",
          isVariantSelected: false,
        },
      ],
      link: "https://www.google.com/search?q=welsh+hills",
      selectedVariant: null,
      inventory: 8,
      price: 27.99,
      onSale: true,
      review: [],
    };
  },
  // any functions are stored inside the methods property
  // unlike data, the object does not need to be returned in a function
  methods: {
    updateImage(variantImage) {
      this.image = variantImage;
    },
    defaultImage() {
      this.image = "./assets/wales.jpg";
    },
    selectVariant(variantId) {
      this.variants.map((variant) => {
        variant.isVariantSelected = false;
      });
      this.variants[variantId].isVariantSelected = true;
      this.selectedVariant = this.variants[variantId].id;
    },
    addToBasket() {
      if (this.selectedVariant !== null) {
        this.inventory -= 1;
        this.$emit("add-to-basket", this.selectedVariant);
      } else {
        alert("Please select a container for your air!");
      }
    },
    removeFromBasket() {
      if (this.selectedVariant === null) {
        alert("Please select a container option to remove!");
      } else if (this.basket.indexOf(this.selectedVariant) === -1) {
        alert("Hmm, you don't have this item in your basket");
      } else {
        this.$emit("remove-from-basket", this.selectedVariant);
        this.inventory += 1;
      }
    },
    submitReview(userReview) {
      this.review.push(userReview);
    },
  },
  // any computing functions are stored in computed property
  // unlike data, the object does not need to be returned in a function
  computed: {
    product() {
      return `${this.area} ${this.location}`;
    },
    delivery() {
      if (this.premiumuser) {
        return "Free";
      } else {
        return "£4.99";
      }
    },
  },
});

Vue.component("item-review", {
  template: `
  <!-- the .prevent is an event modifier on the submit that prevents default behaviour -->
  <div>
    <form class="review-form" v-on:submit.prevent="submitReview" class="reviewForm">
      <label for="name">Your name:</label>
      <!-- v-model is a 2-way bind (data to html, and vice versa) -->
      <input id="name" v-model="name" required></input>
      <label for="comments">Let us know your comments on this item:</label>
      <textarea id="comments" v-model="comment" required></textarea>
      <button type="submit" class="submitButton">Submit</button>
    </form>
  </div>
  `,
  data() {
    return {
      name: null,
      comment: null,
    };
  },
  methods: {
    submitReview() {
      let userReview = {
        name: this.name,
        comment: this.comment,
      };
      this.$emit("submit-review", userReview);
      this.name = null;
      this.comment = null;
    },
  },
});

// make a new vue instance (the root of a vue app) and pass an options object (with optional properties) into it
let app = new Vue({
  // el property tells vue which element is attached to this instance
  el: "#app",
  data: {
    premiumuser: true,
    basket: [],
  },
  methods: {
    addToBasket(id) {
      this.basket.push(id);
    },
    removeFromBasket(id) {
      this.basket.splice(this.basket.indexOf(id), 1);
    },
  },
});
