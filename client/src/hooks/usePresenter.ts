import { Store } from 'vuex'
import { ref, Ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import deepEqueal from 'deep-equal'
import { RootState } from '@/store'

export type PresenterFn<T> = () => T

export const usePresenter = <R>(presenterFn: PresenterFn<R>) => {
  const store = useStore()
  const data = ref(presenterFn())

  const unWatch = (store as Store<RootState>).watch(presenterFn, newVal => {
    if (!deepEqueal(data.value, newVal)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.value = newVal as any
    }
  })

  onUnmounted(() => {
    if (unWatch) unWatch()
  })

  return data as Ref<R>
}
