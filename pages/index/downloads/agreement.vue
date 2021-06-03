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
import { buildAgreement } from '@/vendor/excels'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      title: 'Согласие',
      dialog: true,
      month: moment().format('YYYY-MM')
    }
  },
  methods: {
    async fn() {
      const resDrivers = await this.$axios.post(`/drivers/read`)
      const resTemplate = await this.$axios.get('/agree.xlsx', { responseType: 'arraybuffer' })
      const buf = await buildAgreement(resTemplate.data, resDrivers.data, this.month)
      await FileSaver.saveAs(new Blob([buf]), 'agreement.xlsx')
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