<script setup lang="ts">
import { ref } from "vue";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "vue-sonner";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  axios
    .post("https://nj5om0.laf.run/login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      isLoading.value = false;
      if (res.data.err_code === 0) {
        router.push({ path: "/dashboard" });
      } else {
        toast.error(res.data.err_msg);
      }
    });
}

const email = ref("");
const password = ref("");
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            v-model:model-value="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Input
            v-model:model-value="password"
            class="mt-1"
            id="password"
            placeholder="password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
          Login
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
      <!-- <GitHubLogo v-else class="mr-2 h-4 w-4" /> -->
      GitHub
    </Button>
  </div>
</template>
