// 사용자 ID를 선택하는 셀렉터 함수
export const selectUserId = (state) => state.user.userId;
export const selectUserEmail = (state) => state.user.email;
export const selectUserDisplayName = (state) => state.user.displayName;
export const selectUserPhotoURL = (state) => state.user.photoURL;