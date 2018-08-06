<template>
  <div>
    <v-form v-model="valid">
    <v-text-field label="标题" v-model="article.title" :rules="requiredRule"></v-text-field>
    <!-- md+ -->
    <v-layout row justify-space-around v-if="!this.$vuetify.breakpoint.mdAndDown">
      <v-flex xs6 class="pr-2">
        <v-card flat>
          <v-textarea label="正文" hint="以 Markdown 格式输入" v-model="article.content" auto-grow autofocus flat rows=10 :rules="requiredRule"></v-textarea>
        </v-card>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <v-card flat>
          <p class="caption" style="color:rgba(0, 0, 0, .54)" v-if="!article.content">这下面将是渲染完的HTML预览</p>
          <markdown :content="article.content"></markdown>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- sm- -->
    <template v-if="this.$vuetify.breakpoint.mdAndDown">
      <v-textarea label="正文" hint="以 Markdown 格式输入" v-model="article.content" auto-grow autofocus flat rows=10 v-if="!showPreview" :rules="requiredRule"></v-textarea>
      <template v-if="showPreview">
        <p class="caption" style="color:rgba(0, 0, 0, .54)">渲染完的HTML预览</p>
        <markdown :content="article.content"></markdown>
        <v-divider></v-divider>
      </template>
      <v-switch v-model="showPreview" label="切换预览" color="red darken-3" hide-details></v-switch>
    </template>
    <v-combobox v-model="tags" :items="existingTagNames" placeholder="输入或选择 Tags" chips clearable multiple :search-input.sync="search" hide-selected>
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" close @input="removeTag(data.item)" label medium>
          <strong>{{ data.item }}</strong>&nbsp;
        </v-chip>
      </template>


      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              当前没有 "
              <strong>{{ search }}</strong>"标签。 敲
              <kbd>enter</kbd> 来新建一个。
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-combobox>

    <v-divider class="pb-3"></v-divider>
    <v-card-actions>
      <v-btn class="white--text" color="error" @click="$router.go(-1)">
        放弃更改
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="black--text" color="normal" @click="publish(false)" :disabled="!valid">
        存为草稿
      </v-btn>
      <v-btn class="white--text" color="primary" @click="publish(true)" :disabled="!valid">
        直接发布
      </v-btn>
    </v-card-actions>
    </v-form>
    <v-snackbar v-model="tip" :color="tipColor" :timeout="6000" top>{{ tipMsg }}
      <v-btn flat @click="tip = false">关闭</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        requiredRule: [v => !!v || '此项是必须的'],
        valid: false,
        tip: false,
        tipColor: 'success',
        tipMsg: '',
        existingTags: [],
        existingTagNames: [],
        tags: [],
        search: null,
        showPreview: false,
        article: {
          title: '',
          content: '',
          tagIDs: ''
        }
      }
    },
    async mounted () {
      await this.getExistingTags()
      // 如有id传入，则加载并准备更新
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.$store.dispatch('ARTICLE_DETAIL', id).then((data) => {
          let {title, content, tags, id} = data.data
          for (const tag of tags) {
            this.tags.push(tag.name)
          }
          this.article.title = title
          this.article.content = content
          this.article.id = id
        })
      }
    },
    methods: {
      showTip (color, msg) {
        this.tipColor = color
        this.tipMsg = msg
        this.tip = true
      },
      async getExistingTags () {
        this.existingTagNames = []
        this.$store.dispatch('TAGS').then((data) => {
          this.existingTags = data.data
          this.existingTags.forEach(element => {
            this.existingTagNames.push(element.name)
          })
        })
      },
      removeTag (item) {
        this.tags.splice(this.tags.indexOf(item), 1)
        this.tags = [...this.tags]
      },
      // 由于existingTags 和添加 tag 有先后关系，采用 async-await
      async addTags () {
        // 若无标签，则强行加上无标签标签
        if (!this.tags.length) this.tags = ['无标签']
        this.article.tagIDs = []
        for (const element of this.tags) {
          // 如已有该 tag，则直接取其 id 加入 tagIDs 数组
          if (this.existingTags.findIndex(item => item.name === element) > -1) {
            this.article.tagIDs.push(this.existingTags.find(item => item.name === element).id)
          } else {
            // 若没有，则通过 API 请求添加，再获得其id
            await this.$store.dispatch('CREATE_TAG', { name: element }).then((data) => {
              if (data.success) {
                this.article.tagIDs.push(data.data.id)
                // this.showTip('success')
              } else {
                this.showTip('error', `无法添加tag： ${element}`)
              }
            })
          }
        }
        // 更新 ExistingTags
        await this.getExistingTags()
      },
      // 发布文章
      async publish (isPublish) {
        await this.addTags()
        let article = {}
        // update article
        if (this.article.id) {
          article = {
            id: this.article.id,
            title: this.article.title,
            content: this.article.content,
            tags: this.article.tagIDs,
            publish: isPublish
          }
          await this.$store.dispatch('UPDATE_ARTICLE', article).then(async (data) => {
            if (data.success) {
              this.showTip('success', `文章更新完成`)
              await setTimeout(() => this.$router.push(`/detail/${data.data.id}`), 3000)
            }
          })
        } else {
          article = {
            title: this.article.title,
            content: this.article.content,
            tags: this.article.tagIDs,
            publish: isPublish
          }
          await this.$store.dispatch('CREATE_ARTICLE', article).then(async (data) => {
            if (data.success) {
              this.showTip('success', `文章创建完成`)
              await setTimeout(() => this.$router.push(`/detail/${data.data.id}`), 3000)
            }
          })
        }
      }

    }
  }
</script>