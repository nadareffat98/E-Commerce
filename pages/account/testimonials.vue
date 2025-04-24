<script setup lang="ts">
const userOpinion = ref("");
useHead({
  title: "رأيك بالمتجر",
});
</script>
<template>
  <Card class="card-container shadow-3">
    <template #title>
      <h3>رأيك بالمتجر</h3>
    </template>
    <template #content>
      <form>
        <div class="flex flex-column gap-2">
          <label for="opinion"> اكتب رأيك </label>
          <Textarea
            id="opinion"
            v-model="userOpinion"
            rows="5"
            cols="30"
            placeholder="اكتب رأيك بكل شفافية و صراحة..."
            :autoResize="true"
          />
        </div>
      </form>
    </template>
    <template #footer>
        <Button label="حفظ" class="green-btn w-full" />
    </template>
  </Card>
</template>
