<template>
  <div class="add-edit" v-show="pageShow" v-change>
    <div class="list">
      <div class="item">
        <label for="name"><i>*</i>姓名</label>
        <input type="text" id="name" v-model="name" placeholder="请输入姓名" maxlength="20" />
        <van-icon name="clear" color="#ccc" v-show="name" @click="name = ''" />
      </div>

      <div class="item">
        <label for="phone"><i>*</i>电话</label>
        <input type="number" id="phone" v-model="phone" placeholder="请输入电话号码" maxlength="11" />
        <van-icon name="clear" color="#ccc" v-show="phone" @click="phone = ''" />
      </div>

      <div class="item">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" placeholder="请输入Email" />
        <van-icon name="clear" color="#ccc" v-show="email" @click="email = ''" />
      </div>

      <div class="item">
        <label for="type"><i>*</i>证件类型</label>
        <div @click="showType = true">
          <p>{{ id_type_name }}</p>
          <van-icon name="arrow" size="22px" color="#a1a4a7" />
        </div>
      </div>

      <div class="item">
        <label for="card"><i>*</i>证件号码</label>
        <input type="text" id="card" placeholder="请输入证件号码" v-model="id_number" />
        <van-icon name="clear" color="#ccc" v-show="id_number" @click="id_number = ''" />
      </div>

      <div class="item">
        <label for="name"><i>*</i>出生日期</label>
        <div @click="showDateAct" :class="{ 'default-color': id_type === 1 }">
          <p>{{ getFormDate }}</p>
          <van-icon name="arrow" size="22px" color="#a1a4a7" />
        </div>
      </div>

      <div class="item">
        <label for="sex"><i>*</i>性别</label>
        <van-radio-group v-model="sex" direction="horizontal" :disabled="id_type === 1" checked-color="#fa9716">
          <van-radio :name="1">男</van-radio>
          <van-radio :name="2">女</van-radio>
          <!-- <van-radio :name="0">未知</van-radio> -->
        </van-radio-group>
      </div>

      <div class="item">
        <label for="jh">婚姻状态</label>
        <van-radio-group v-model="is_married" direction="horizontal" checked-color="#fa9716">
          <van-radio :name="0">未婚</van-radio>
          <van-radio :name="1">已婚</van-radio>
        </van-radio-group>
      </div>

      <div class="item">
        <label for="jh">是否本人</label>
        <van-radio-group v-model="is_default" direction="horizontal" checked-color="#fa9716">
          <van-radio :name="1">是</van-radio>
          <van-radio :name="0">否</van-radio>
        </van-radio-group>
      </div>

      <div class="item">
        <label for="tag">关系</label>
        <input
          type="text"
          id="tag"
          :readonly="is_default === 1"
          :class="{ 'default-color': is_default === 1 }"
          v-model="remark"
          placeholder="请填写与本人关系"
        />
        <van-icon name="clear" color="#ccc" v-show="is_default !== 1 && remark" @click="remark = ''" />
      </div>

      <div class="item">
        <label for="name">地区</label>
        <div @click="showPicker = true">
          <p>{{ cityValue.length ? cityValue.join(' ') : '请选择城市' }}</p>
          <van-icon name="arrow" size="22px" color="#a1a4a7" />
        </div>
      </div>
    </div>

    <footer>
      <div class="btn" @click="commit">{{ is_add ? '新增档案' : '编辑档案' }}</div>
    </footer>

    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker type="date" :max-date="maxDate" :min-date="minDate" @confirm="confirmDate" @cancel="showDate = false" />
    </van-popup>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :loading="loadingCity"
        ref="picker"
        :columns="cityList"
        value-key="area_name"
        @confirm="chosenCity"
        @cancel="showPicker = false"
        value="[1,3,5]"
      />
    </van-popup>

    <van-popup v-model="showType" position="bottom">
      <van-picker
        :columns="cardTypes"
        :default-index="id_type - 1"
        value-key="name"
        @cancel="showType = false"
        show-toolbar
        @confirm="cardPickerConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Icon, RadioGroup, Radio, DatetimePicker, Picker, Popup } from 'vant'
import { formatDate } from '@/utils/tool'
import { phoneCheck, IdCardCheck, emailCheck } from '@/utils/verify'

let cardTypes = [
  { name: '身份证', id: 1 },
  { name: '护照', id: 2 },
  { name: '回乡证', id: 3 },
  { name: '台胞证', id: 4 },
  { name: '其他', id: 5 }
]
export default {
  name: 'add-edit',
  components: {
    [Icon.name]: Icon,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data() {
    return {
      pageShow: false,
      is_add: true,
      canCommit: true,

      showType: false,
      showDate: false,
      showPicker: false,
      loadingCity: true,

      cityList: [],

      name: '',
      phone: '',
      email: '',
      cardTypes, //证件类型枚举数组
      id_type: 1, //证件类型选择的枚举id
      id_number: '', //证件号
      sex: '', //性别
      birthday: '', //出生日期
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),

      province_id: '', //省
      city_id: '', //市
      area_id: '', //区
      cityValue: [],
      remark: '本人', //关系 / 标签
      keepRemark: '', //保存原先填写的remark
      is_default: 1, //是否为本人
      is_married: 0 //是否已婚
    }
  },
  created() {
    this.is_add = !this.$route.query.hasOwnProperty('id')

    if (!this.is_add) {
      this.$store.commit('UPDATE_TITLE_BAR_TITLE', '编辑档案')

      this.getDetail()
    } else {
      this.pageShow = true
    }

    this.getCityList()
  },
  methods: {
    getCityList() {
      this.loadingCity = true
      this.$api.city.tree().then((res) => {
        this.loadingCity = false
        if (res.code === 200) {
          this.cityList = res.data
        }
      })
    },

    //获取原先档案详情
    getDetail() {
      this.$store.commit('SET_LOADING', true)

      this.$api.health_records.familyDetail(this.$route.query.id).then((res) => {
        this.name = res.data.name
        this.phone = res.data.phone
        this.email = res.data.email
        this.id_type = res.data.id_type
        this.id_number = res.data.id_number
        this.sex = res.data.sex
        this.birthday = new Date(res.data.birthday)
        this.province_id = res.data.province_id
        this.city_id = res.data.city_id
        this.area_id = res.data.area_id
        this.remark = res.data.remark
        this.is_default = res.data.is_default
        this.is_married = res.data.is_married

        if (res.data.area) {
          this.cityValue = [res.data.province, res.data.city, res.data.area]
        }

        this.$store.commit('SET_LOADING', false)
        this.pageShow = true
      })
    },

    //按钮提交操作 提交前判断是编辑还是新增
    commit() {
      if (!this.canCommit) {
        return
      }
      // 姓名验证
      const nameRegExp = /[^a-zA-Z\u4e00-\u9fa5]/g
      if (this.name.trim() === '') {
        this.$toast('请输入姓名')
        return
      }
      if (nameRegExp.test(this.name.trim())) {
        this.$toast('姓名填写不规范，请正确填写')
        return
      }

      //手机号码验证
      if (!phoneCheck(this.phone)) {
        this.$toast('请输入电话号码')
        return
      }

      //证件号码验证
      if (this.id_number.trim() === '') {
        this.$toast('请输入证件号码')
        return
      }
      if (this.id_type === 1) {
        const info = IdCardCheck(this.id_number)
        if (typeof info === 'string') {
          this.$toast(info)
          return
        }
      }

      //出生日期
      if (this.birthday === '') {
        this.$toast('请填选择出生日期')
        return
      }

      //出生日期
      if (this.sex === '') {
        this.$toast('请选择性别')
        return
      }

      this.canCommit = false
      this.$store.commit('SET_LOADING', true)

      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        id_type: this.id_type,
        id_number: this.id_number,
        sex: this.sex,
        birthday: this.getFormDate,
        remark: this.remark,
        is_default: this.is_default,
        is_married: this.is_married
      }

      if (this.area_id !== '') {
        Object.assign(data, {
          province_id: this.province_id,
          city_id: this.city_id,
          area_id: this.area_id
        })
      }

      if (this.is_add) {
        this.$api.health_records.addFamily(data).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$store.commit('SET_LOADING', false)

            this.$toast('新增成功')

            setTimeout(() => {
              this.$router.replace('/health-records')
            }, 2000)
          }
        })
      } else {
        this.$api.health_records.editFamily(data, this.$route.query.id).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$store.commit('SET_LOADING', false)

            this.$toast('编辑成功')

            setTimeout(() => {
              this.$router.replace('/health-records')
            }, 2000)
          }
        })
      }
    },

    showDateAct() {
      if (this.id_type === 1) {
        return
      } else {
        this.showDate = true
      }
    },

    // 选择日期确定
    confirmDate(value) {
      this.birthday = value
      this.showDate = false
    },

    //选择城市
    chosenCity(val, i) {
      // console.log(val, i)
      this.cityValue = val

      this.showPicker = false
      const province = this.cityList[i[0]]
      this.province_id = province.id
      if (province.children.length) {
        const city = province.children[i[1]]
        this.city_id = city.id
        if (city.children.length) {
          const area = city.children[i[2]]
          this.area_id = area.id
        }
      }

      // console.log(this.area)
    },
    //证件类型选择
    cardPickerConfirm(val) {
      // console.log(val)
      this.id_type = val.id

      this.showType = false
    }
  },
  computed: {
    id_type_name() {
      const cur_type_arr = this.cardTypes.filter((item) => item.id === this.id_type)

      return cur_type_arr[0].name
    },
    getFormDate() {
      return this.birthday ? formatDate('yyyy/MM/dd', this.birthday) : '请选择出生日期'
    }
  },
  watch: {
    is_default(cur, pre) {
      if (cur === 1) {
        this.keepRemark = this.remark
        this.remark = '本人'
      } else if (cur === 0 && this.keepRemark) {
        this.remark = this.keepRemark
      }
    },
    id_number(cur, pre) {
      if (this.id_type === 1) {
        const info = IdCardCheck(this.id_number)

        console.log(info)

        if (typeof info !== 'string') {
          this.birthday = new Date(info[1])
          this.sex = info[3]
        }
      }
    },
    id_type(cur, pre) {
      if (cur === 1) {
        const info = IdCardCheck(this.id_number)

        console.log(info)

        if (typeof info !== 'string') {
          this.birthday = new Date(info[1])
          this.sex = info[3]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-edit {
  min-height: calc(100vh - 82px);
  background-color: #fff;

  .list {
    padding: 0 30px 140px;
    border-top: 1px solid #e4e7ed;
    background-color: #fff;

    .item {
      width: 100%;
      border-bottom: 1px solid #e4e7ed;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-right: 20px;

      //   &:last-child {
      //     border-bottom: none;
      //   }

      label {
        width: 150px;
        margin-right: 15px;
        color: @black-d;
        i {
          color: red;
        }
      }

      input {
        flex: 1;

        &::placeholder {
          color: @grey-l;
        }
        &.default-color {
          color: @grey-l;
        }
      }
      > div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.default-color {
          color: @grey-l;
        }

        &.van-radio-group.van-radio-group--horizontal {
          justify-content: flex-start;

          .van-radio.van-radio--horizontal {
            margin-right: 60px;
          }
        }
      }

      > i {
        margin-left: 10px;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    height: 120px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #e4e7ed;
    z-index: 999;

    .btn {
      width: 85%;
      height: 80px;
      border-radius: 40px;
      background-color: @theme2;
      text-align: center;
      line-height: 80px;
      color: #fff;
      font-size: 30px;
      font-weight: 500;
      font-family: @Medium;
    }
  }
}
</style>