<template>
  <div class="w-[300px] bg-[#f9fafb]">
    <div class="p-[10px] flex items-center">
      <div class="font-bold text-[22px]">标签自动分组</div>
      <div class="flex-auto"></div>
      <a-switch v-model:checked="autoGroupSwitch"></a-switch>
    </div>
    <a-divider style="margin: 0"></a-divider>
    <div class="p-[10px]">
      <!-- <a-form
        layout="horizontal"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 14 }"
      >
        <a-form-item label="自动分组">
        </a-form-item>
      </a-form> -->
      <a-button type="primary">一键分组</a-button>
    </div>

    <!-- <a-divider style="margin: 0"/> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const autoGroupSwitch = ref(true);
</script>

<style lang="scss" scoped>
@import 'tailwindcss/utilities';
@import 'tailwindcss/components';
</style>