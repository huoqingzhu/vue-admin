import { useRoute,useRouter } from "vue-router";
export const getRouter=()=> {
  const route=useRoute()
  // const pathList = this.$route.path.split("/").filter((item) => item);
  // const path = `/${pathList[0]}`;
  // let router = this.$router.options.routes.find((x) => x.path === path);
  // return { path, router };
  console.log(route)
}