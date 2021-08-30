const base = "http://localhost:5000",
  api = "api",
  auth = "auth",
  user = "user",
  verify = "verify";

const url = {
  get user() {
    return `/${api}/${user}`;
  },
  get userProfile() {
    return `${this.user}/profile`;
  },
  get signup() {
    return `${api}/${auth}/signup`;
  },
  get smsOtpVerify() {
    return `${api}/${auth}/${verify}/smsOtp`;
  },
  get routeToAuthURL() {
    return `/${auth}`;
  },
  get login() {
    return `${api}/${auth}/login`;
  },
  get passwordReset() {
    return `/${api}/auth/passwordReset`;
  },
  get updateName() {
    return `${api}/user/update/name`;
  },
  get updateResidenceAddress() {
    return `${api}/user/update/residenceAddress`;
  },
  get updatePassword() {
    return `${api}/user/update/password`;
  },
  get updateMobileNumber() {
    return `${api}/user/update/mobileNumber`;
  },
  get updateUserNonAuthInfo() {
    return `${api}/user/update/nonAuthInfo`;
  },
  get updateAvatar() {
    return `${api}/user/update/avatar`;
  },
  get image() {
    return `${api}/image/`;
  },
  get forgotPassword() {
    return `${api}/auth/forgotPassword`;
  },
  get homePageLatestAdds() {
    return `${api}/adds/home/latest-adds`;
  },
  categoryLatestAdds(category) {
    return `${api}/adds/category/${category}`;
  },
  // get cart() {
  //   return `${api}/user/cart`;
  // },
  get cart() {
    return `${api}/user/my-orders/cart`;
  },
  get cartCheckout() {
    return `${api}/user/my-orders/cart/checkout`;
  },
  get cancelCurrentOrders() {
    return `${api}/user/my-orders/currentOrders`;
  },
  get wishlist() {
    return `${api}/user/my-orders/wishlist`;
  },
  get allUploadedAdds() {
    return `${api}/user/upload/adds`;
  },
  get uploadAdd() {
    return `${api}/user/upload/add`;
  },
  get sendMessageToOwner() {
    return `${api}/adds/sendMessageToOwner`;
  },
  get productRenteeUserInfo() {
    return `${api}/adds/getProductRenteeUserInformation`;
  },
};

export default url;
