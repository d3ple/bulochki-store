<template>
  <div>
    <div class="carousel">
      <h3 class="carousel__text">
        Я люблю вас, булочки, булочки мои 💖
      </h3>
      <carousel class="carousel__item" :autoplay="true" :autoplay-timeout="5000" :per-page="1">
        <slide>
          <img class="carousel__image" src="~/assets/images/bulochka4.jpg">
        </slide>
        <slide>
          <img class="carousel__image" src="~/assets/images/bulochka1.jpg">
        </slide>
        <slide>
          <img class="carousel__image" src="~/assets/images/bulochka3.jpg">
        </slide>
        <slide>
          <img class="carousel__image" src="~/assets/images/bulochka2.jpg">
        </slide>
      </carousel>
    </div>

    <div class="filters">
      <div class="filters__filters">
        <vs-select
          v-model="type"
          label="Тесто"
        >
          <vs-option label="Любое" value="all">
            Любое
          </vs-option>
          <vs-option label="Слоеное" value="layered">
            Слоеное
          </vs-option>
          <vs-option label="Дрожжевое" value="yeast">
            Дрожжевое
          </vs-option>
        </vs-select>

        <vs-input
          v-model="search"
          class="search"
          label="Поиск"
          placeholder="Введите название булочки"
        />
      </div>

      <div class="filters__sorting">
        <label>Сортировать цены по: </label>
        <span :class="['sort', {'sort--active': sortType === 'asc' }]" @click="sortType = 'asc'">возрастанию</span>
        <span> / </span>
        <span :class="['sort', {'sort--active': sortType === 'desc' }]" @click="sortType = 'desc'">убыванию</span>
      </div>
    </div>

    <div class="cards">
      <Card v-for="bul in searcedBulochki" :key="bul.id" :data="bul" class="card" />
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      type: 'all',
      sortType: '',
      search: ''
    }
  },
  computed: {
    bulochki () {
      return Object.values(this.$store.state.bulochki.list)
    },

    filteredBulochki () {
      if (this.type === 'all') {
        return this.bulochki
      }

      return this.bulochki.filter(b => b.dough === this.type)
    },

    sortedBulochki () {
      if (this.sortType === 'asc') {
        return [...this.filteredBulochki].sort((a, b) => {
          return a.price - b.price
        })
      }

      if (this.sortType === 'desc') {
        return [...this.filteredBulochki].sort((a, b) => {
          return b.price - a.price
        })
      }

      return this.filteredBulochki
    },

    searcedBulochki () {
      return this.sortedBulochki.filter(b => b.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
</script>

<style>
.carousel {
  width: 100%;
  margin-top: 40px;
  position: relative;
}

.carousel__text {
  position: absolute;
  font-size: 50px;
  color: white;
  z-index: 2;
  bottom: 100px;
  left: 50px;
  line-height: 1.0em;
  text-shadow: 5px 4px 2px rgba(52, 52, 52, 1);
}

.carousel__item {
  width: 100%;
}

.VueCarousel-slide {
  display: flex;
  height: 400px;
}

.VueCarousel-dot-container {
  margin: 0px !important;
}

.carousel__image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.cards {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-right: -150px;
  margin-bottom: -30px;
}

.card {
  flex: 0 1 300px;
  margin-right: 150px;
  margin-bottom: 30px;
}

.filters {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.filters__sorting {
  margin-top: 5px;
  font-size: 14px;
}

.filters__filters {
  display: flex;
}

.sort {
  cursor: pointer;
}

.sort--active {
  color: #ffba00;
  font-weight: 600;
}

.search .vs-input {
  margin-left: 10px;
  padding: 10px 13px;
}
</style>
