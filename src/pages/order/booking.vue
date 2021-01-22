<template>
  <div class="booking">
    <section class="book">
      <CollapseTransition>
        <div class="form" ref="wrapper" v-show="showBookInfo">
          <FormSelect label="预约时间" placeholder="请选择时间" v-model="bookForm.reservation_time" @select="showCalendar=true">
          </FormSelect>
          <FormBtn label="预约人信息" placeholder="选择预约人" v-show="familyList.length" @select="showFamilyPicker"></FormBtn>
          <FormInput label="预约人" placeholder="请填写预约人真实姓名" v-model="bookForm.name" maxlength="20"></FormInput>
          <FormInput type="tel" maxlength="11" label="手机号码" v-model="bookForm.phone" placeholder="请填写11位手机号码">
          </FormInput>
          <FormSelect v-if="false" label="证件类型" placeholder="身份证" v-model="curIdCard.text" @select="showIdPicker=true">
          </FormSelect>
          <FormInput v-if="false" label="证件号码" placeholder="请填写预约人证件号码" @blur="verityIdCard"
            v-model="curFamily.id_number">
          </FormInput>
          <FormRadioGrp v-if="false" label="性别" @change="chosenSex" v-model="bookForm.sex" :option="SEX_TYPE_ARR">
          </FormRadioGrp>
          <FormRadioGrp v-if="false" label="婚否" @change="chosenMarriage" v-model="bookForm.marriage"
            :option="MARRIAGE_TYPE_ARR">
          </FormRadioGrp>
          <FormSelect v-if="false" label="出生日期" placeholder="请选择出生日期" v-model="bookForm.birthday"
            @select="showBirthdayPicker=true">{{age}}</FormSelect>
          <FormSelect v-if="false" label="体检报告" @select="showReport=true" placeholder="机构自取"></FormSelect>
        </div>
      </CollapseTransition>
      <footer>
        <button @click="submit">确认预约</button>
      </footer>
    </section>
    <!-- 证件类型 -->
    <IdCardPicker v-model="showIdPicker" @confirm="chosenIdCard"></IdCardPicker>
    <!-- 出生日期选择 -->
    <BirthdayPicker v-model="showBirthdayPicker" @confirm="chosenBirthday"></BirthdayPicker>
    <!-- 日期选择 -->
    <van-calendar v-model="showCalendar" :min-date="minBookDate" :max-date="maxBookDate" :formatter="formatter"
      title="选择预约日期" :color="variable.theme" @confirm="chosenBookDate" safe-area-inset-bottom
      :style="{ height: '80%' }" />
    <!-- 时间选择 -->
    <!-- <BookTimePicker title="选择预约时间" v-model="showBookTime" @confirm="chosenBookTime" @back="backtoCalendar" ></BookTimePicker> -->
    <!-- 常用体检人 -->
    <FamilyList v-model="showFamily" title="选择体检人" :active="curFamily" :list="familyList" @confirm="chosenFamily">
    </FamilyList>
    <!-- 报告 -->
    <ReportList v-model="showReport" title="选择领取报告方式" @confirm="chosenReport"></ReportList>

  </div>
</template>
<script>
import bookingMixin from '@/mixins/bookingMixin'
export default {
  name: 'booking',
  mixins: [bookingMixin],
  methods: {
    submit() {
      if (this.checkBookForm()) {
        this.$toast.loading('提交中...')
        this.$api.store.reserve({ id: this.$route.query.id, ...this.bookForm }).then((res) => {
          this.$toast(res.message)
          if (res.code === 200) {
            this.$router.back()
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/style/mixin.less';
@import './booking.less';
.booking {
  flex: 1;
  background-color: #fff;
  font-size: 28px;
  .book {
    .form {
      margin: 0;
      padding-right: 0;
      background-color: #fff;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    .safe-padding-bottom(0px);
    button {
      color: #fff;
      background-color: @theme;
      width: 642px;
      height: 80px;
      border-radius: 40px;
    }
  }
}
</style>
