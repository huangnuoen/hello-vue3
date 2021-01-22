import { Divider, DropdownMenu, DropdownItem, List } from 'vant'
import GoodsItem from '@/components/mall/GoodsItem'
import Empty from '@/base/Empty/Empty'
import DropMenu from '@/components/mall/DropMenu'
// import { SUBMALL_TYPE } from '@/config/common'
import * as types from '@/store/mutation-types'

export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Divider.name]: Divider,
    [List.name]: List,
    GoodsItem,
    Empty,
    DropMenu
  },

  data() {
    return {
      searchParams: { order_type: '', cate_id: this.$route.query.cate_id || '' },
      // SUBMALL_TYPE,
      smallLoading: true,
      finished: false,
      goodsList: [],
      // submallDetail: {},
      page: 1,
      finishText: '',
      curSort: '',
      // chosenClasses: [],
      sortList: [
        { text: '综合排序', value: '' },
        { text: '价格最低', value: 'selling_price' },
        { text: '销量最高', value: 'quantity_sold' }
      ]
      // cateList: []
    }
  },
  methods: {
    getGoodsList(params) {
      this.finished = false
      this.smallLoading = true
      if (!this.goodsList.length) {
        this.setLoading(true)
      }
      this.$api.store.products({ params: { ...this.$route.query, ...params, page: this.page } }).then((res) => {
        this.setLoading(false)
        this.smallLoading = false
        if (res.code === 200) {
          this.goodsList = this.goodsList.concat(res.data.data)
          if (this.goodsList.length >= res.data.total) {
            this.$nextTick(() => {
              this.finishText = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) ? '没有更多了~' : ''
            })
            this.finished = true
          } else {
            this.page++
          }
        }
      })
    },
    toGoods(item) {
      this.$router.push(`/goods/${item.id}`)
    },
    onLoad() {
      // this.getGoodsList()
      this.getGoodsList(this.searchParams)
    },

    chooseClass(id) {
      setTimeout(() => {
        this.$refs.classePanel.toggle()
      }, 500)
      this.goodsList = []
      this.searchParams.cate_id = id
      this.page = 1
      this.getGoodsList(this.searchParams)
    },

    chooseSort(value) {
      this.goodsList = []
      this.searchParams.order_type = value
      this.page = 1
      this.getGoodsList(this.searchParams)
    }
  },
  computed: {
    cate_name() {
      if (this.cateList.length && this.searchParams.cate_id) {
        const cate = this.cateList.find((item) => {
          return +this.searchParams.cate_id === +item.value
        })

        return cate.text
      } else {
        return '全部分类'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'goods') {
      this.$store.commit(types.DELETE_KEEPALIVEPAGES, from.name)
    }
    next()
  }
}
