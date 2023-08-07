import axios from 'axios';
// import { computed } from 'vue'
// import store from '@/store/index'
import { setInterceptors } from '@/common/interceptors';
// 토큰을 가져오는 함수 //로그인되어 있는 경우 토큰을, 없는 경우 그냥 axios 요청을 보내는 axios 함수
// state에 저장할 예정. 가져와야 함.
// const isLogin = computed(() => store.getters['auth/isLogin'])
// const accessToken = function getToken() {
//   return computed(() => store.getters['auth/accessToken'])
// }
//accessToken 넣지 않은 일반 axios
const api = axios.create({
    baseURL: 'http://localhost:8080'
});
//accessToken을 헤더에 담은 axios
const apiClient = setInterceptors(api);
export default { api, apiClient };
//# sourceMappingURL=apiClient.js.map