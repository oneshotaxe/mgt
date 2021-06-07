<template lang="pug">
  v-layout
    v-row
      v-col
        v-text-field(label="Номер" v-model="model.num")
        v-text-field(label="Ф.И.О." v-model="model.name")
        v-autocomplete(label="Автобус" v-model="model.bus" :items="buses")
      v-col
        graphic-form(v-model="model.graphic")
</template>

<script>
import GraphicForm from '@/components/GraphicForm.vue'

export default {
  components: {
    GraphicForm
  },
  props: ['model'],
  async created () {
    const { data } = await this.$axios.post('/buses/read')
    this.buses = data.map(b => ({ text: b.num, value: b._id }))
  },
  data () {
    return {
      buses: []
    }
  }
}
</script>