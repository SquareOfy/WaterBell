import apiModule from '@/types/apiClient'
import store from '@/store/index'
import router from '@/router/index'
const apiClient = apiModule.apiClient
const auth = {
  namespaced: true,
  state: {
    isLogin: false,
    loginUser: null,
    role: null,
    accessToken: null,
    refreshToken: null,
    //-------------------------------------------------------이하 지하차도
    facilityId: null,
    nowUnderroad: {},
    underroadListByGugun: [],
    underroadList: [] //지하차도 전부 리스트 //map에서 뿌릴 때 썼음
  },
  getters: {
    loginUser: (state) => state.loginUser,
    isLogin: (state) => state.isLogin,
    role: (state) => state.role,
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    //-------------------------------------------------------------- 지하차도
    facilityId: (state) => state.facilityId,
    nowUnderroad(state) {
      return state.nowUnderroad
    },
    underroadList(state) {
      return state.underroadList
    },
    underroadListByGugun(state) {
      return state.underroadListByGugun
    }
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      state.role = user.role
      state.isLogin = true
    },
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    setIsLogin(state, value) {
      state.isLogin = value
    },
    logout(state) {
      state.loginUser = null
      state.isLogin = false
      state.role = null
      state.accessToken = null
      state.refreshToken = null
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken
    },
    //--------------------------------------------------------------지하차도
    setFacilityId(state, value) {
      state.facilityId = value
    },
    setNowUnderroad(state, value) {
      state.nowUnderroad = value
    },
    setUnderroadbygugun(state, payload) {
      state.underroadListByGugun.push(payload)
    },
    setUnderroadList(state, payload) {
      state.underroadList.push(payload)
    },
    resetList(state) {
      state.underroadList = []
      state.underroadListByGugun = []
    }
  },
  actions: {
    async memberLogin({ commit }, { loginId, password }) {
      try {
        // console.log('실행되는가?')
        const response = await apiClient.post('/member/login', {
          loginId,
          password
        })
        let user
        const member = response.data.member
        const accessToken = member.accessToken
        const refreshToken = member.refreshToken
        switch (member.role) {
          case 'APART_MANAGER':
          case 'PUBLIC_MANAGER': {
            // user = {
            //   id: member.id,
            //   loginId: member.loginId,
            //   role: member.role,
            //   phone: member.phone,
            //   facilityId: member.facilityId
            // }
            const error = new Error(`NOT_MEMBER`)
            // alert(error.message)
            throw error
          }
          case 'APART_MEMBER':
            user = {
              id: member.id,
              loginId: member.loginId,
              role: member.role,
              phone: member.phone,
              facilityId: member.facilityId,
              name: member.name,
              addressNumber: member.addressNumber
            }
            break
          // case 'PUBLIC_MANAGER':
          // user = {
          //   id: member.id,
          //   loginId: member.loginId,
          //   role: member.role,
          //   phone: member.phone,
          //   sidoId: member.sidoId,
          //   facilityId: member.facilityId || []
          // }
          // break
        }
        // 여기서 user 객체를 store에 저장하거나 다른 처리를 할 수 있습니다.
        commit('setLoginUser', user)
        // commit('setIslogin', true); // Typo here: setIsLogin
        commit('setTokens', { accessToken, refreshToken })
        commit('setIsLogin', true)
        // 여기에서 auth state에 있는 loginUser를 getter로 가져오고 싶어.
        // 어떻게 해야해?
        const isLogin = store.getters['auth/isLogin']
        if (isLogin) {
          router.push('/park/dash')
        }
      } catch (error) {
        // console.log(error)
        // const { data, status, statusText } = error.response
        if (error.message === 'NOT_MEMBER') {
          alert('존재하지 않는 회원입니다.')
        } else if (error.response.data.message === 'fail') {
          switch (error.response.data.exception) {
            case '일치하는 회원이 없습니다.':
              alert('존재하지 않는 회원입니다.2')
              break
            case '비밀번호가 일치하지 않습니다.':
              alert('비밀번호가 일치하지 않습니다.')
              break
          }
        }
        return
      }
    },
    async logout({ commit }) {
      apiClient.post('/member/logout').then((res) => {
        console.log(res.data)
      })
      commit('logout')
    },

    async socialLogin({ commit }, member) {
      try {
        const accessToken = member.accessToken
        const refreshToken = member.refreshToken

        // 여기서 user 객체를 store에 저장하거나 다른 처리를 할 수 있습니다.
        commit('setTokens', { accessToken, refreshToken })
        commit('setIsLogin', true)
        // 여기에서 auth state에 있는 loginUser를 getter로 가져오고 싶어.
        // 어떻게 해야해?
        const isLogin = store.getters['auth/isLogin']
        if (isLogin) {
          router.push('/park/dash')
        }
      } catch (error) {
        // console.log(error)
        // const { data, status, statusText } = error.response
        alert('로그인에 실패했습니다.')
      }
      return
    }
  } // actions 객체의 닫는 중괄호
} // auth 모듈의 닫는 중괄호
export default auth
//# sourceMappingURL=auth.js.map
