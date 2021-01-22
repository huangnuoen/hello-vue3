import {
  getAgentInfo
} from "@/utils/agent"
export default {
  created() {
    getAgentInfo()
  },
  computed: {
    authStatus() {
      return this.$store.state.user.authStatus
    }
  },
  watch: {
    authStatus() {
      getAgentInfo()
    }
  }
}
