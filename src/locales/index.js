/**
 * Vue i18n loader
 * created by @musnow
 * https://github.com/musnow
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// default language
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
// change default accept-language
import { axios } from '@/utils/request'
import { DEFAULT_Lang } from '@/store/mutation-types'

Vue.use(VueI18n)
var localLang = "zh-CN";
//TODO:未知问题 Vue.ls.get(DEFAULT_Lang)不能使用
if (window.localStorage.getItem("pro__Lang")) {
  localLang = (JSON.parse(window.localStorage.getItem("pro__Lang")).value);
}
const defaultLang = localLang;

// export const defaultLang

const messages = {
  'en-US': {
    ...enUS
  },
  'zh-CN': {
    ...zhCN
  }
}

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]

// 从缓存設置中加载当前语言
// if(Vue.ls){
//   if (Vue.ls.get(DEFAULT_Lang) !== null && defaultLang !== Vue.ls.get(DEFAULT_Lang)) {
// loadLanguageAsync('zh-CN')
//   }
// }


function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute(DEFAULT_Lang, lang)
  return lang
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.ls.set(DEFAULT_Lang, lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}