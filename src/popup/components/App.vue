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
      <a-form layout="vertical">
        <a-form-item label="每个分组的最小Tab数量：">
          <a-row>
            <a-col :span="12">
              <a-slider
                :value="state.config.minGroupTabNum"
                :min="1"
                :max="10"
                @change="onMinGroupTabNumChange"
              ></a-slider>
            </a-col>
            <a-col :span="4">
              <a-input-number
                class="ml-[20px]"
                :value="state.config.minGroupTabNum"
                :min="1"
                :max="20"
                @change="onMinGroupTabNumChange"
              ></a-input-number>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="域名分组策略：">
          <a-radio-group
            :value="state.config.domainGroupType"
            button-style="solid"
            @change="onDomainGroupChange"
          >
            <a-radio-button :value="1">按照域名</a-radio-button>
            <a-radio-button :value="2">按一级域名</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </div>
    <a-divider style="margin: 0"></a-divider>
    <div class="p-[10px]">
      <a-button type="primary">一键分组</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
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

function onMinGroupTabNumChange(value: number) {
  state.config.minGroupTabNum = value;
  chromeStorageSet({ minGroupTabNum: value });
}

// 初始化state
async function initState() {
  const config = (await chromeStorageGet(
    Object.keys(DEFAULT_CONFIG)
  )) as ConfigType;
  state.config = { ...DEFAULT_CONFIG, ...config };
  chromeSendMessage(config);
}

function onDomainGroupChange(event: Event) {
  const { value } = event.target as HTMLInputElement;
  state.config.domainGroupType = Number(value);
  chromeStorageSet({ domainGroupType: value });
}

onBeforeMount(() => {
  initState();
});
</script>

<style lang="scss" scoped>
@import 'tailwindcss/utilities';
@import 'tailwindcss/components';
</style>
