<template lang="pug">
  v-container
    nuxt-child
    v-row
      v-col
        v-subheader Выгрузки
        v-list(dense)
          v-list-item(to="/downloads/report") Отчет
          v-list-item(to="/downloads/magazine") Журнал
          v-list-item(to="/downloads/magazineNew") Новый журнал
          v-list-item(to="/downloads/magazineMini") Журнал мини
          v-list-item(to="/downloads/agreement") Согласие
        v-subheader Резервное копирование
        v-list(dense)
          v-list-item(to="/backup/download") Скачать
          v-list-item(to="/backup/upload") Загрузить
      v-col
        v-subheader Данные
        v-list(dense)
          v-list-item(to="/drivers") Водители
          v-list-item(to="/buses") Автобусы
          v-list-item(to="/routes") Маршруты
          v-list-item(to="/ways") Выходы
</template>

<script>
export default {
  
}
</script>