import create from 'zustand'

type State = {
  title: string
  user: any
  router: any
  events: any
  setEvents: (events: any) => void
}

const useStore = create<State>((set) => {
  return {
    title: '',
    user: null,
    router: {},
    events: null,
    setEvents: (events) => {
      set({ events })
    },
  }
})

export default useStore
