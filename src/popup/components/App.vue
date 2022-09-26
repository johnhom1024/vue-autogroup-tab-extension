<template>
  <div class="w-[300px] bg-[#f9fafb]">
    <div class="p-[10px] flex items-center">
      <div class="font-bold text-[22px]">标签自动分组</div>
      <div class="flex-auto"></div>
      <a-switch
        :checked="state.config.enableAutoGroup"
        @change="onEnableAutoGroupChange"
      ></a-switch>
    </div>
    <a-divider style="margin: 0"></a-divider>
    <div class="p-[10px]">
      <a-button type="primary">一键分组</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount,  } from 'vue';
// utils
import { DEFAULT_CONFIG } from '@/utils/constant';
import {
  chromeStorageSet,
  chromeStorageGet,
  chromeSendMessage,
} from '@/utils/index';

type ConfigType = typeof DEFAULT_CONFIG;

const state = reactive({
  config: {} as ConfigType,
});

// 设置是否启用自动合并标签组的功能
function onEnableAutoGroupChange(value: boolean) {
  state.config.enableAutoGroup = value;
  chromeStorageSet({ enableAutoGroup: value });
}

// 初始化state
async function initState() {
  const config = (await chromeStorageGet(Object.keys(DEFAULT_CONFIG))) as ConfigType;
  state.config = config;
}

onBeforeMount(() => {
  initState();
});
</script>

<style lang="scss" scoped>
@import 'tailwindcss/utilities';
@import 'tailwindcss/components';
</style>
