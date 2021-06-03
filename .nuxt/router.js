import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ed564a7c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _136a7a0c = () => interopDefault(import('..\\pages\\index\\backup\\download.vue' /* webpackChunkName: "pages_index_backup_download" */))
const _bea3b3f6 = () => interopDefault(import('..\\pages\\index\\backup\\upload.vue' /* webpackChunkName: "pages_index_backup_upload" */))
const _880a5ffe = () => interopDefault(import('..\\pages\\index\\downloads\\agreement.vue' /* webpackChunkName: "pages_index_downloads_agreement" */))
const _0f3a8bed = () => interopDefault(import('..\\pages\\index\\downloads\\magazine.vue' /* webpackChunkName: "pages_index_downloads_magazine" */))
const _6ef95e64 = () => interopDefault(import('..\\pages\\index\\downloads\\magazineMini.vue' /* webpackChunkName: "pages_index_downloads_magazineMini" */))
const _a42962ba = () => interopDefault(import('..\\pages\\index\\downloads\\magazineNew.vue' /* webpackChunkName: "pages_index_downloads_magazineNew" */))
const _745e61cd = () => interopDefault(import('..\\pages\\index\\downloads\\report.vue' /* webpackChunkName: "pages_index_downloads_report" */))
const _67652421 = () => interopDefault(import('..\\pages\\_prefix.vue' /* webpackChunkName: "pages__prefix" */))
const _7b72a662 = () => interopDefault(import('..\\pages\\_prefix\\new.vue' /* webpackChunkName: "pages__prefix_new" */))
const _14899992 = () => interopDefault(import('..\\pages\\_prefix\\profile\\_id.vue' /* webpackChunkName: "pages__prefix_profile__id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _ed564a7c,
    name: "index",
    children: [{
      path: "backup/download",
      component: _136a7a0c,
      name: "index-backup-download"
    }, {
      path: "backup/upload",
      component: _bea3b3f6,
      name: "index-backup-upload"
    }, {
      path: "downloads/agreement",
      component: _880a5ffe,
      name: "index-downloads-agreement"
    }, {
      path: "downloads/magazine",
      component: _0f3a8bed,
      name: "index-downloads-magazine"
    }, {
      path: "downloads/magazineMini",
      component: _6ef95e64,
      name: "index-downloads-magazineMini"
    }, {
      path: "downloads/magazineNew",
      component: _a42962ba,
      name: "index-downloads-magazineNew"
    }, {
      path: "downloads/report",
      component: _745e61cd,
      name: "index-downloads-report"
    }]
  }, {
    path: "/:prefix",
    component: _67652421,
    name: "prefix",
    children: [{
      path: "new",
      component: _7b72a662,
      name: "prefix-new"
    }, {
      path: "profile/:id?",
      component: _14899992,
      name: "prefix-profile-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
