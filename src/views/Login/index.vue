<template>
  <div class="Login">
    <div class="content">
      <div class="left-block">
        <!-- <img class="loginLogo" src="@/assets/images/login/logo.svg" /> -->
        <div class="loginLogo">
          <div class="logo" />
          <span class="title">{{ $CONFIG.title }}</span>
        </div>

        <img class="loginBg" src="@/assets/images/login/loginBg.png" />
        <!-- <p class="loginText">{{ $CONFIG.title }}</p> -->
      </div>

      <div class="right-block">
        <div class="login-title">
          {{ isQrCode ? (bound ? "扫码登录" : "绑定原账号") : "密码登录" }}
          <span class="back" @click="back" v-if="isQrCode && !bound">
            <i class="el-icon-arrow-left"></i> 返回</span
          >
        </div>
        <img
          class="login-icon"
          @click="isQrCode = !isQrCode"
          :src="
            require(isQrCode
              ? '@/assets/images/login/userLogo.png'
              : '@/assets/images/login/erWei.png')
          "
        />

        <!-- 二维码登录 -->
        <div v-if="isQrCode" class="erWei-wrapper">
          <!-- <img src="@/assets/images/login/erWeiImg.png" class="erWeiImg" /> -->
          <div v-if="bound">
            <iframe
              class="erWeiImg"
              :src="iframeSrc"
              scrolling="no"
              frameborder="0"
            ></iframe>
            <div class="tips">
              <img src="@/assets/images/login/scan.png" />
              打开浙政钉 | 扫一扫登录
            </div>
            <div class="mask"></div>
          </div>
          <div v-else class="bound">
            <el-input
              v-model="phoneNumber"
              @input="phoneInput"
              placeholder="请输入原账号手机号码"
              type="number"
              style="margin: 20px 0"
            ></el-input>
            <div style="color: #1a71ed" v-if="tips">
              您输入的手机号不存在，请致电18751805983获取 技术支持帮助！
            </div>
            <div v-if="select">
              <div style="line-height: 24px; color: rgba(181, 171, 171, 96)">
                <p>账号名称：{{ select.username }}</p>
                <p>账号用户名 ：{{ select.realname }}</p>
                <p>账号手机号 ：{{ select.phone }}</p>
              </div>
              <!-- <el-select
                placeholder="请选择原账号名称"
                style="width: 100%"
                v-model="value"
                @change="selectChange"
                v-else
              >
                <el-option
                  v-for="item in originalAccount"
                  :key="item.username"
                  :label="item.username"
                  :value="item.username"
                >
                </el-option>
              </el-select> -->
            </div>
            <el-button
              type="primary"
              :disabled="!select"
              style="width: 100%; margin-top: 20px"
              @click="accountBinding"
              >确定</el-button
            >
          </div>
        </div>
        <!-- 密码登录 -->
        <el-form
          v-if="!isQrCode"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="item-title">用户名</div>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              prefix-icon="el-icon-user"
            />
            <!-- <img class="elImg" src="@/assets/images/login/userIcon.png" /> -->
          </el-form-item>

          <div class="item-title">密码</div>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-lock"
            />
            <!-- <img
              class="elImg"
              style="width: 24px; height: 24px; right: 1px"
              src="@/assets/images/login/passwordIcon.png"
            /> -->
            <div class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </div>
          </el-form-item>

          <div class="item-title">验证码</div>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item prop="captcha">
                <el-input
                  v-model="loginForm.captcha"
                  placeholder="请输入验证码"
                  tabindex="3"
                  @keyup.enter.native="handleLogin"
                />
                <!-- <img
                  class="elImg"
                  style="width: 24px; height: 24px; right: 1px"
                  src="@/assets/images/login/passwordIcon.png"
                /> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <img
                  v-if="requestCodeSuccess"
                  style="margin-top: 2px"
                  :src="randCodeImage"
                  @click="handleChangeCheckCode"
                />
                <img
                  v-else
                  style="margin-top: 2px"
                  src="@/assets/images/login/checkcode.png"
                  @click="handleChangeCheckCode"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
import * as Api from "@/api/user.js";

export default {
  name: "Login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error("Please enter the correct user name"));
    //   } else {
    //     callback();
    //   }
    // };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        // username: "admin",
        // password: "123456",
        username: "",
        password: "",
        captcha: "",
        checkKey: 0,
        remember_me: true,
      },
      loginRules: {
        username: [
          // { required: true, trigger: "blur", validator: validateUsername },
          { required: true, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      select: null,
      originalAccount: null, //数组
      tips: false,
      phoneNumber: "",
      passwordType: "password",
      code: null, //浙政钉code
      bound: true, //默认是已经绑定,
      redirect: undefined,
      isExternalLink: "0", // 是否是外链，0：否，1：是。
      isQrCode: false,

      // iframeSrc: "https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=Brand_dingoa&redirect_uri=http://192.168.1.102:9528&scope=get_user_info&authType=QRCODE&embedMode=true",
      iframeSrc: `${window.zzdOfConfig.addr}?response_type=code&client_id=${window.zzdOfConfig.client_id}&redirect_uri=${window.zzdOfConfig.redirect_uri}&scope=get_user_info&authType=QRCODE&embedMode=true`,

      currdatetime: "",
      randCodeImage: "",
      requestCodeSuccess: false,
      value: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
        this.isExternalLink =
          (route.query && route.query.isExternalLink) || "0";
      },
      immediate: true,
    },
  },
  created() {
    // 获取验证码图片
    this.handleChangeCheckCode();

    // 监听 来自政务钉钉二维码的iframe页面的消息
    window.addEventListener("message", this.messageCallback);
  },
  beforeDestroy() {
    // 解除 对iframe的监听
    window.removeEventListener("message", this.messageCallback);
  },
  methods: {
    // 获取验证码图片
    handleChangeCheckCode() {
      let currdatetime = new Date().getTime();
      this.loginForm.checkKey = currdatetime;
      Api.getAction(`/sys/randomImage/${currdatetime}`)
        .then((res) => {
          if (res.success) {
            this.randCodeImage = res.result;
            this.requestCodeSuccess = true;
          } else {
            this.$message.error(res.message);
            this.requestCodeSuccess = false;
          }
        })
        .catch(() => {
          this.requestCodeSuccess = false;
        });
    },
    // iframe的消息回调
    messageCallback(event) {
      if (event.origin === "https://login.dg-work.cn") {
        // 这里的event.data 就是登录成功的信息
        console.log("--来自 专有钉钉二维码iframe 的消息--", event.data);
      }

      if (event.data.code) {
        this.loading = true;
        this.code = event.data.code;
        this.$store
          .dispatch("user/loginByQRcode", { code: this.code, bound: false })
          .then((res) => {
            if (res == 1) {
              this.loading = false;
              this.bound = false;
            } else {
              this.afterLogin();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    back() {
      this.bound = true;
      this.code = null;
      this.select = null;
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    // 登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.afterLogin();
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    afterLogin() {
      if (this.isExternalLink === "0") {
        let protocol = window.location.protocol;
        let host = window.location.host;
        let pathname = window.location.pathname;
        window.location.href = `${protocol}//${host}${pathname}#${
          this.redirect || "/"
        }`;
      } else {
        window.location.href = this.redirect;
      }
    },
    phoneInput(value) {
      if (value.length == 11) {
        this.phoneChange(value);
      }
    },
    // 手机号码改变
    phoneChange(value) {
      const mPattern = /^1[34578]\d{9}$/;
      if (!mPattern.test(value)) {
        this.$message.error("手机号码不正确");

        return;
      }
      console.log("请求", value);
      // 请求后 返回数据
      Api.getAccount(this.code, value)
        .then((res) => {
          const { result } = res;
          if (result?.username || result?.realname || result?.phone) {
            this.select = result;
            this.tips = false;
          } else {
            this.tips = true;
            return;
          }
        })
        .catch(() => {
          // this.tips = false;
          // this.select = { username: 123, realname: "用户名", phone: "123" };
        });
    },
    accountBinding() {
      Api.accountBinding(
        this.code,
        this.select.username,
        this.select.phone
      ).then((res) => {
        this.$store
          .dispatch("user/loginByQRcode", { code: this.code, bound: true })
          .then(() => {
            this.afterLogin();
            if (res == 1) {
              // this.loading = false;
              this.bound = false;
            } else {
              this.afterLogin();
            }
          })
          .catch((err) => {
            if (err == 0) {
              this.bound = false;
            }
          });
      });
    },
    // selectChange(value) {
    //   const obj = this.originalAccount.find((item) => item.username == value);
    //   this.select = obj;
    // },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
