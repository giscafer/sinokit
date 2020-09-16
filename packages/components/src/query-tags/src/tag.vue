<template>
  <transition v-if="disableTransitions" name="s-zoom-in-center">
    <span :class="classes" :style="{ 'backgroundColor': this.color }" @click="handleClick">
      <span class="tag-label">
        <slot></slot>
      </span>
      <i v-if="closable" class="s-tag__close el-icon-error" @click="handleClose"></i>
    </span>
  </transition>
  <span v-else :class="classes" :style="{ 'backgroundColor': this.color }" @click="handleClick">
    <span class="tag-label">
      <slot></slot>
    </span>
    <i v-if="closable" class="s-tag__close el-icon-error" @click="handleClose"></i>
  </span>
</template>
<script>
export default {
  name: 'STag',
  props: {
    field: String,
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    color: String,
    size: {
      type: String,
      default: 'small',
    },
    effect: {
      type: String,
      default: 'light',
      validator(val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      },
    },
  },
  data() {
    return {
      classes: [
        's-tag',
        this.type ? `s-tag--${this.type}` : '',
        this.tagSize ? `s-tag--${this.tagSize}` : '',
        this.effect ? `s-tag--${this.effect}` : '',
        this.hit && 'is-hit',
        !this.border && 'noborder',
      ],
    }
  },
  computed: {
    tagSize() {
      return this.size
    },
  },
  methods: {
    handleClose(event) {
      event.stopPropagation()
      this.$emit('close', this.field)
    },
    handleClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>
<style lang="scss" scoped>
$primaryColor: #409eff;
$bgColor: #fff;
$borderColor: #3c4353;
$fontColor: #3c4353;
$prefix: 's-tag';
.#{$prefix} {
  position: relative;
  display: inline-block;
  background-color: $bgColor;
  height: 30px;
  width: 200px;
  // line-height: 30px;
  font-size: 16px;
  color: $fontColor;
  border: 1px solid $borderColor;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  margin-right: 10px;
  margin-top: 6px;

  .tag-label {
    display: inline-block;
    height: 100%;
    padding: 0 10px;
    line-height: 30px;
    width: 198px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  &__close {
    position: relative;
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    height: 16px;
    width: 16px;
    line-height: 10px;
    vertical-align: middle;
    color: #a6aab8;
    top: -8px;
    right: 20px;
  }
  &.noborder {
    border: 0;
  }
  &--dark {
    &__close:hover {
      color: #fff;
      background-color: #66b1ff;
    }
    &--info &__close {
      color: #fff;
      &:hover {
        color: #fff;
        background-color: #a6a9ad;
      }
    }
  }
  &--dark &--info {
    background-color: #909399;
    border-color: #909399;
    color: #fff;
  }

  &--dark &--info.is-hit {
    border-color: #909399;
  }
}
</style>
