import { defineStore } from 'pinia'
import { getUser } from '@/api/user'

export const useStore = defineStore('login', {
    state: () => ({
        token: null,
    }),
    getters: {
        isLogin(): boolean {
            return !!this.token
        },
    },
    actions: {
        async login(value: number) {
            const { data } = await getUser()
            return data
        },
    },
})
