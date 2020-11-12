<template>
  <nuxt-link :to="`/bulochka/${data.id}`">
    <vs-card type="4">
      <template #title>
        <h3>
          {{ data.title }}
        </h3>
      </template>
      <template #img>
        <img class="image" :src="data.img">
      </template>
      <template #text>
        <p>
          {{ data.shortDesc }}
        </p>
      </template>
      <template #interactions>
        <vs-button v-if="data.isNew" danger icon>
          Новинка
        </vs-button>
        <vs-button class="btn-chat" shadow primary>
          <i class="bx bx-chat" />
          <span class="span">
            {{ data.price + ' ₽' }}
          </span>
        </vs-button>
      </template>
    </vs-card>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>
.vs-card__img {
  display: flex;
}

.image {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
</style>
