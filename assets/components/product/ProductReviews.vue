<script lang="ts">
export default defineComponent({
  name: "ProductReviews",
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
});
</script>
<template>
    <div class="reviews-container">
        {{ reviews }}
    </div>
</template>
