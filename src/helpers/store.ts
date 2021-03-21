import create from 'zustand'

type MagicUser = {
  email: string
  issuer: string
  publicAddress: string
}

type State = {
  title: string
  magicUser: MagicUser | any
  router: any
  events: any
  setEvents: (events: any) => void
}

const useStore = create<State>((set) => {
  return {
    title: '',
    magicUser: null,
    router: {},
    events: null,
    setEvents: (events) => {
      set({ events })
    },
  }
})

export default useStore
