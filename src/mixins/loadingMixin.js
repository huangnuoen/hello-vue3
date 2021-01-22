import * as types from '@/store/mutation-types'

export default {
  computed: {
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    setLoading(loading) {
      this.$store.commit(types.SET_LOADING, loading)
    }
  }
}
