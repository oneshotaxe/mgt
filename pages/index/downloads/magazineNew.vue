<template lang="pug">
  v-dialog(width="300" v-model="dialog")
    v-card
      v-card-title {{ title }}
      v-card-text
        v-text-field(label="Месяц" v-model="month" v-mask="'####-##'")
      v-card-actions
        v-spacer
        v-btn(@click="fn") Скачать
</template>

<script>
import FileSaver from 'file-saver'
import moment from 'moment'
import { buildMagazineNew } from '@/vendor/excels'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      title: 'Журнал',
      dialog: true,
      month: moment().format('YYYY-MM')
    }
  },
  methods: {
    async fn() {
      const { data } = await this.$axios.post('/magazine', { busesPerPage: 5, month: this.month })
      const buf = await buildMagazineNew(data)
      await FileSaver.saveAs(new Blob([buf]), 'magazine.xlsx')
      this.$router.push(`/`)
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$router.push(`/`)
      }
    }
  }
}
</script>