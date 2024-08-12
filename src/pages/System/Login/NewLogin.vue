<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Createinfor } from '@/store/create'
import { Userinfor } from '@/store/user'
import { systemapi } from '@/pages/Api/SystemIndex'
import { accountinfor } from '@/pages/Interface/SystemInterfact'
import { Auditorinfor } from '@/store/auditor'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/vue-query'

// Define refs for form inputs
const account_id = ref('')
const account_password = ref('')
const router = useRouter()
const isLoading = ref(false)

// Define mutation function using useMutation
const mutation = useMutation({
  mutationFn: async (params: accountinfor) => {
    const response = await systemapi.login(params)
    return response
  },
  onMutate: () => {
    isLoading.value = true
  },
  onSuccess: (res) => {
    isLoading.value = false
    if (res.err_code === 0) {
      switch (res.account_identites) {
        case 'CREATE':
          const createinfor = Createinfor()
          createinfor.$clear()
          createinfor.transmit(account_id.value)
          createinfor.transmitname(res.name)
          router.push({ path:"/createtaskfinsh"  })
          break
        case 'Auditor':
          const auditorinfor = Auditorinfor()
          auditorinfor.transmit(account_id.value)
          router.push({ path: '/auditornavigate' })
          break
        case 'USER':
          const userinfor = Userinfor()
          userinfor.clear()
          userinfor.transmit(account_id.value)
          userinfor.transmitname(res.name)
          router.push({ path: '/usertask' })
          break
        default:
          break
      }
    } else {
      toast.error(res.err_msg)
    }
  },
  onError: (error) => {
    isLoading.value = false
    toast.error(error.message)
  },
  onSettled: () => {
    isLoading.value = false
  },
})

// Form submission handler
async function onSubmit(event: Event) {
  event.preventDefault()
  mutation.mutate({
    account_id: account_id.value,
    account_passowrd: account_password.value,
  })
}
</script>

<template>
  <div class="flex relative">
    <div class="justify-center top-60 mx-auto flex-col space-y-6 w-[400px] absolute md:left-1/3 duration-700 sm:left-1/3 left-14">
      <div>
        <form @submit="onSubmit">
          <div class="logintext ml-20 cursor-default text-cyan-500">Academic Time</div>
          <Input 
            v-model:model-value="account_id"
            type="text"
            placeholder="账号 123456"
            :disabled="isLoading"
            class="mt-5 placeholder:italic placeholder:text-slate-400 block bg-white 
            w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
            focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            required
          />
          <Input 
            v-model:model-value="account_password"
            class="mt-5 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9
            pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            id="password"
            type="password"
            placeholder="密码 password"
            :disabled="isLoading"
            required
          />
          <a @click="$router.push({ path: '/register' })" 
            :class="
              cn(
                buttonVariants({ variant: 'ghost' }),
                'user-select-none Loginregister text-violet-500 hover:text-violet-800 block italic'
              )
            "
          >
            注册
          </a>
          <Button :disabled="isLoading" type="submit" class="rounded-full mt-10 w-full bg-cyan-500 hover:bg-cyan-600">
            登入
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logintext {
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  margin-bottom: 5px;
  text-align: center;
}

.Loginregister {
  position: absolute;
  right: 5%;
  font-size: 15px;
  cursor: pointer;
}
</style>
