<template>
  <div>
    <h1 class="display-1 my-2">撰写</h1>
    <v-text-field label="标题" v-model="article.title"></v-text-field>
    <!-- md+ -->
    <v-layout row justify-space-around v-if="!this.$vuetify.breakpoint.mdAndDown">
      <v-flex xs6 class="pr-2">
        <v-card flat>
          <v-textarea label="正文" hint="以 Markdown 格式输入" v-model="article.content" auto-grow autofocus flat rows=10></v-textarea>
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
      <v-textarea label="正文" hint="以 Markdown 格式输入" v-model="article.content" auto-grow autofocus flat rows=10 v-if="!showPreview"></v-textarea>
      <template v-if="showPreview">
        <p class="caption" style="color:rgba(0, 0, 0, .54)">渲染完的HTML预览</p>
        <markdown :content="article.content"></markdown>
        <v-divider></v-divider>
      </template>
      <v-switch v-model="showPreview" label="切换预览" color="red darken-3" hide-details></v-switch>
    </template>
    <v-combobox v-model="article.tags" :items="existingTagNames" placeholder="输入或选择 Tags" chips clearable multiple :search-input.sync="search"
      hide-selected>
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
      <v-btn class="white--text" color="error" @click="addTags">
        放弃更改
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="black--text" color="normal">
        存为草稿
      </v-btn>
      <v-btn class="white--text" color="primary">
        直接发布
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        existingTags: [],
        existingTagNames: [],
        search: null,
        showPreview: false,
        article: {
          title: '',
          content: '',
          tags: ''
        }
      }
    },
    computed: {
      switchView () {
        const binding = {}
        // 尺寸大于 sm 时切换为并排
        if (this.$vuetify.breakpoint.smAndDown) binding.column = true
        return binding
      }
    },
    mounted () {
      this.$store.dispatch('TAGS').then((data) => {
        this.existingTags = data.data
        this.existingTags.forEach(element => {
          this.existingTagNames.push(element.name)
        })
      })
      // 如有id传入，则加载并准备更新
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.$store.dispatch('ARTICLE_DETAIL', id).then((data) => {
          this.article = data.data
        })
      }
    },
    methods: {
      removeTag (item) {
        this.article.tags.splice(this.article.tags.indexOf(item), 1)
        this.article.tags = [...this.article.tags]
      },
      addTags () {
        let tagIDs = []
        this.article.tags.forEach(element => {
          // 如已有该 tag，则直接取其 id 加入 tagIDs 数组
          if (this.existingTags.findIndex(item => item.name === element) > -1) {
            tagIDs.push(this.existingTags.find(item => item.name === element).id)
          } else {
            // 若没有，则通过 API 请求添加，再获得其id
            this.$store.dispatch('CREATE_TAG', { name: element }).then((data) => {
              if (data.success) {
                tagIDs.push(data.data.id)
                // this.$refs.tip.openTip('标签创建完成')
              } else {
                console.error(`Failed to create the tag ${element}.`)
              }
            })
          }
        })
      },
      publish (isPublish) {
        let tagsID = []
        let article = {}
        if (!this.article.title || !this.article.content) {
          this.$refs.tip.openTip('标题和内容不能为空！')
          return false
        }
        this.article.tags.forEach((item) => {
          tagsID.push(item.id)
        })
        // update article
        if (this.article.id) {
          article = {
            id: this.article.id,
            title: this.article.title,
            content: this.article.content,
            tags: tagsID,
            publish: isPublish
          }
          this.$store.dispatch('UPDATE_ARTICLE', article).then((data) => {
            if (data.success) {
              // this.$refs.tip.openTip('文章更新完成')
            }
          })
        } else {
          article = {
            title: this.article.title,
            content: this.article.content,
            tags: tagsID,
            publish: isPublish
          }
          this.$store.dispatch('CREATE_ARTICLE', article).then((data) => {
            if (data.success) {
              // this.$refs.tip.openTip('文章创建完成')
              this.article.title = ''
              this.article.content = ''
              this.article.tags = []
            }
          })
        }
      }

    }
  }
</script>