<template>
  <div class="s-number-info">
    <slot name="subtitle">
      <div class="s-number-info-subtitle">
        {{ typeof subTitle === 'string' ? subTitle : subTitle() }}
      </div>
    </slot>
    <div class="s-number-info-value">
      <span>{{ total }}</span>
      <span class="sub-total">
        {{ subTotal }}
        <i :class="`el-icon-caret-${status === 'up' ? 'top' : 'bottom'}`"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SNumberInfo',
  props: {
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    subTitle: {
      type: [String, Function],
      default: '',
    },
    status: {
      type: String,
      default: 'up',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
$heading-color: #000000d9;
$text-color-secondary: #00000073;
$red-6: #f5222d;
$green-6: #52c41a;

.s-number-info {
  &-subtitle {
    color: $text-color-secondary;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }

  &-value {
    margin-top: 4px;
    font-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;

    & > span {
      color: $heading-color;
      display: inline-block;
      line-height: 32px;
      height: 32px;
      font-size: 24px;
      margin-right: 32px;
    }

    .sub-total {
      color: $text-color-secondary;
      font-size: 16px;
      vertical-align: top;
      margin-right: 0;
      i {
        font-size: 12px;
        transform: scale(0.82);
        margin-left: 4px;
      }
      .el-icon-caret-top {
        color: $red-6;
      }
      .el-icon-caret-bottom {
        color: $green-6;
      }
    }
  }
}
</style>
