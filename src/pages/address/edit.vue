<template>
  <div class="address-edit" v-change>
    <div class="form">
      <van-field v-model="form.name" label="收货人" placeholder="请输入收货人姓名" />
      <van-field v-model="form.phone" type="tel" label="手机号" maxlength="11" class="tel" placeholder="请输入收货人手机号" />
      <van-field readonly clickable name="picker" is-link :value="area.name" label="所在地区" placeholder="请选择地区" @click="showPicker = true" />
      <van-field v-model="form.address" rows="2" autosize label="详细地址" type="textarea" maxlength="50" placeholder="请输入详细地址" />
      <button v-show="$route.query.id" v-waves @click="deleteAddress">删除该地址</button>
    </div>
    <footer>
      <button v-waves @click="submit">保存</button>
    </footer>
    <van-popup v-model="showPicker" position="bottom">
      <!-- <van-picker show-toolbar title="标题" value-key="area_name" :columns="cityList" /> -->
      <van-picker
        show-toolbar
        :loading="loadingCity"
        ref="picker"
        :columns="cityList"
        value-key="area_name"
        @confirm="chosenCity"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { Field, Popup, Picker } from 'vant'
import { phoneCheck } from '@/utils/verify'
const formToastText = {
  name: '请输入收货人姓名',
  phone: '请输入收货人手机号',
  address: '请输入收货人地址'
}
export default {
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: ''
      },
      area: { name: '', id: '' },
      showPicker: false,
      cityList: [],
      loadingCity: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loadingCity = true
      this.$api.city.tree().then((res) => {
        this.loadingCity = false
        if (res.code === 200) {
          this.cityList = res.data
        }
      })
      const id = this.$route.query.id
      if (id) {
        this.$api.address.shipping_addresses({ id, params: { app_id: this.$store.state.appId } }).then((res) => {
          if (res.code === 200) {
            const { name, phone, address, city, province, area, area_id } = res.data
            this.form = { name, phone, address }
            this.area.name = [province, city, area].join(' ')
            this.area.id = area_id
          }
        })
      }
    },
    deleteAddress() {
      const id = this.$route.query.id
      this.$dialog
        .confirm({
          message: '确定删除该地址吗？',
          confirmButtonText: '删除',
          cancelButtonText: '再想想'
        })

        .then(() => {
          this.$toast.loading({
            message: '正在删除...'
          })
          this.$api.user
            .address({ id, method: 'delete' })
            .finally(() => {
              this.$toast.clear()
            })
            .then((res) => {
              if (res.code === 200) {
                this.$toast('删除成功')
                this.$store.commit('user/SET_ADDRESS', {})
                this.$router.back()
              }
            })
        })
        .catch(() => {})
    },
    submit() {
      for (const key in this.form) {
        if (Object.hasOwnProperty.call(this.form, key)) {
          if (!this.form[key]) {
            this.$toast(formToastText[key])
            return
          }
        }
      }
      if (!this.area.id) {
        this.$toast('请选择所在地区')
        return
      }
      if (!phoneCheck(this.form.phone)) {
        this.$toast('手机号格式不正确')
        return
      }
      this.$toast.loading({
        message: '正在保存...'
      })

      const data = Object.assign({}, this.form, { area_id: this.area.id })
      const id = this.$route.query.id
      data.app_id = this.$store.state.appId
      this.$api.user
        .address({ data, method: id ? 'put' : 'post', id })
        .finally(() => {
          this.$toast.clear()
        })
        .then((res) => {
          if (res.code === 200) {
            this.$toast('保存成功')
            this.$router.back()
          }
        })
    },
    chosenCity(val, i) {
      this.area.name = val.join(' ')
      this.showPicker = false
      const province = this.cityList[i[0]]
      if (province.children.length) {
        const city = province.children[i[1]]
        if (city.children.length) {
          const area = city.children[i[2]]
          this.area.id = area.id
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
.address-edit {
  .form {
    .tel {
      margin-bottom: 20px;
    }
    /deep/ input,
    /deep/ textarea {
      font-size: 28px;
      .placeholder(#d9d9d9);
    }
    button {
      font-size: 28px;
      color: @red;
      padding: 32px 30px;
      background-color: #fff;
      width: 100%;
      margin-top: 20px;
      text-align: left;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 750px;
    height: 120px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    .safe-padding-bottom(0px);
    button {
      background-color: @theme;
      color: #fff;
      width: 642px;
      height: 80px;
      border-radius: 40px;
    }
  }
}
</style>
