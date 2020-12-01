<template>
  <a-dropdown>
    <span class="action global-lang">
      <a-icon type="global" style="font-size: 16px" />
      <!-- <span>{{currentLang}}</span> -->
    </span>
    <a-menu slot="overlay" style="width: 150px;" @click="SwitchLang">
      <a-menu-item :key="item.key" v-for="item in langs">
        <a rel="noopener noreferrer">
          <span role="img" :aria-label="item.lang">🇨🇳</span>
          {{item.language}}
        </a>
      </a-menu-item>
      <!-- <a-menu-item key="zh-CN">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
        </a>
      </a-menu-item>
      <a-menu-item key="zh-TW">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="繁体中文">🇭🇰</span> 繁体中文
        </a>
      </a-menu-item>
      <a-menu-item key="en-US">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="English">🇬🇧</span> English
        </a>
      </a-menu-item>
      <a-menu-item key="pt-BR">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="Português">🇧🇷</span> Português
        </a>
      </a-menu-item>-->
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mixin as langMixin } from '@/store/i18n-mixin'
import moment from 'moment'

export default {
  name: 'LangSelect',
  mixins: [langMixin],
  data() {
    return {
      langs: [
        {
          key: 'zh-CN',
          lang: '中文',
          language: '简体中文',
          icon: '🇨🇳'
        },
        {
          key: 'en-US',
          lang: '中文',
          language: 'English',
          icon: '🇬🇧'
        }
      ]
      // lang:""
    }
  },
  computed: {
    lang() {
      var currentLang = this.currentLang
      // console.log(currentLang)
      if (currentLang) {
        var data = this.langs.find(c => {
          if (c.key == currentLang) {
            return c
          }
        })
        console.log(data)
        return data.lang
      }
      return undefined
    }
  },
  methods: {
    moment,
    SwitchLang(row) {
      this.setLang(row.key)

      const localeValue = row.key == 'zh-CN' ? 'zh-cn' : 'en'
      moment.locale('en')
    }
  }
}
</script>
