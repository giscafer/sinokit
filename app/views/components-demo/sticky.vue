<template>
  <div>
    <s-sticky :z-index="10" class-name="sub-navbar" appendTo=".main-content">
      <el-dropdown trigger="click">
        <el-button plain>
          Platform<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border">
          <el-checkbox-group v-model="platforms" style="padding: 5px 15px">
            <el-checkbox
              v-for="item in platformsOptions"
              :key="item.key"
              :label="item.key"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button plain>
          Link<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          class="no-padding no-border"
          style="width: 300px"
        >
          <el-input v-model="url" placeholder="Please enter the content">
            <template slot="prepend"> Url </template>
          </el-input>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker
          v-model="time"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="Release time"
        />
      </div>

      <el-button style="margin-left: 10px" type="success"> publish </el-button>
    </s-sticky>

    <div class="components-container">
      <aside>Sticky header, 当页面滚动到预设的位置会吸附在顶部</aside>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <s-sticky :sticky-top="150" appendTo=".main-content">
        <el-button type="primary"> placeholder</el-button>
      </s-sticky>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
      <div>这里是占位符</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StickyDemo',
  data() {
    return {
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
        { key: 'a-platform', name: 'platformA' },
        { key: 'b-platform', name: 'platformB' },
        { key: 'c-platform', name: 'platformC' },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
    }
  },
}
</script>

<style scoped>
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}
</style>
