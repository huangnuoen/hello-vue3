// 预约流程
import FormSelect from '@/components/order/FormSelect'
import FormItem from '@/components/order/FormItem'
import FormInput from '@/components/order/FormInput'
import FormRadioGrp from '@/components/order/FormRadioGrp'
import FormBtn from '@/components/order/FormBtn'
import CollapseTransition from '@/base/Transition/CollapseTransition'
import FamilyList from '@/components/order/FamilyList'
// import BookTimePicker from '@/components/order/BookTimePicker'
import ReportList from '@/components/order/ReportList'
import IdCardPicker from '@/components/order/IdCardPicker'
import BirthdayPicker from '@/components/order/BirthdayPicker'
import BaseCheckbox from '@/base/BaseCheckbox/BaseCheckbox'
import { formatDate, computeAge } from '@/utils/tool'
import { IdCardCheck, phoneCheck } from '@/utils/verify'
import { Dialog, Popup, Calendar, DatetimePicker } from 'vant'
import { ID_TYPE_ARR, ID_TYPE, SEX_TYPE_ARR, MARRIAGE_TYPE_ARR } from '@/config/common'
import variable from '@/style/variable.less'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const formToastText = {
  reservation_time: '请先选择预约时间',
  name: '请填写预约人真实姓名',
  phone: '请填写手机号码'
  // birthday: '请先选择出生日期',
  // id_type: '请先选择证件类型',
  // id_number: '请填写证件号码',
  // sex: '请选择性别'
}
const bookingMixin = {
  components: {
    FormSelect,
    FormItem,
    FormInput,
    FormRadioGrp,
    FormBtn,
    [Popup.name]: Popup,
    [Calendar.name]: Calendar,
    [Dialog.Component.name]: Dialog.Component,
    [DatetimePicker.name]: DatetimePicker,
    CollapseTransition,
    BaseCheckbox,
    FamilyList,
    ReportList,
    BirthdayPicker,
    IdCardPicker
    // BookTimePicker,
  },
  data() {
    return {
      showBookInfo: true,
      showCouponList: false,
      showFamily: false,
      showReport: false,
      showCalendar: false,
      showIdPicker: false,
      // showBookTime: false,
      showBirthdayPicker: false,
      curFamily: {},
      // 证件类型默认身份证
      curIdCard: ID_TYPE_ARR[0],
      bookForm: {
        reservation_time: '',
        name: '',
        phone: ''
        // id_type: 1,
        // id_number: '',
        // birthday: '',
        // sex: '',
        // marriage: ''
      },
      minBookDate: undefined,
      maxBookDate: undefined,
      familyList: [],
      MARRIAGE_TYPE_ARR,
      variable,
      SEX_TYPE_ARR: SEX_TYPE_ARR.slice(1, 3) // 去掉未知项
    }
  },
  mounted() {
    this.setDateRange()
    this.getFamily()
  },
  methods: {
    showFamilyPicker() {
      this.showFamily = true
    },
    chosenMarriage(item) {
      this.bookForm.marriage = item.value
    },
    chosenSex(item) {
      this.bookForm.sex = item.value
    },
    checkBookForm() {
      for (const key in this.bookForm) {
        if (Object.hasOwnProperty.call(this.bookForm, key)) {
          const value = this.bookForm[key]
          if (!value && formToastText[key]) {
            this.$toast(formToastText[key])
            return false
          }
        }
      }
      if (!phoneCheck(this.bookForm.phone)) {
        this.$toast('手机号格式错误')
        return false
      }
      return true
    },
    verityIdCard(id) {
      const info = IdCardCheck(id)
      if (typeof info === 'string') {
        this.$toast(info)
      } else {
        if (!this.bookForm.birthday) {
          this.bookForm.birthday = formatDate('yyyy/MM/dd', new Date(info[1]))
        }
        const sex = this.bookForm.sex
        if (!sex) {
          this.bookForm.sex = info[3]
        }
      }
    },
    getFamily() {
      this.$api.user.medical_examiners().then((res) => {
        if (res.code === 200) {
          this.familyList = res.data.data
        }
      })
    },
    setDateRange() {
      // 预约之日第2天-第60天
      const now = new Date().getTime()
      this.minBookDate = new Date(now + DAY)
      this.maxBookDate = new Date(now + DAY * 60)
    },
    chosenIdCard(item) {
      this.curIdCard = item
      this.bookForm.id_type = item.value
    },
    chosenFamily(item) {
      // curFamily有存在的必要吗
      this.curFamily = item
      // 修改数据不影响原来体检人列表数据
      this.bookForm.name = item.name
      this.bookForm.birthday = item.birthday
      this.bookForm.phone = item.phone
      this.bookForm.id_number = item.id_number
      this.bookForm.sex = item.sex
      // 默认选中证件
      this.curIdCard = { value: item.id_type, text: ID_TYPE[item.id_type] }
      this.showFamily = false
    },
    chosenReport() {
      this.showReport = false
    },
    chosenBookDate(value) {
      this.bookForm.reservation_time = formatDate('yyyy.MM.dd', value)
      this.showCalendar = false
      // this.showBookTime = true
    },
    chosenBookTime(time) {
      // this.showCalendar = false
      this.showBookTime = false
    },
    chosenBirthday(value) {
      this.bookForm.birthday = formatDate('yyyy/MM/dd', value)
    },
    backtoCalendar() {
      this.showBookTime = false
      this.showCalendar = true
    },
    formatter(day) {
      const month = day.date.getMonth() + 1
      const date = day.date.getDate()

      // if (month === 5) {
      //   if (date === 13) {
      //     day.type = 'disabled'
      //     day.topInfo = '满'
      //     day.className = 'full'
      //   } else if (date === 11) {
      //     day.text = '今天'
      //   }
      // }

      return day
    },

    expandBookInfo() {
      this.showBookInfo = !this.showBookInfo
    }
  },
  computed: {
    age() {
      if (this.bookForm.birthday) {
        return computeAge(this.bookForm.birthday) + '岁'
      } else {
        return ''
      }
    }
  }
}
export default bookingMixin
