import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { device } from "@/store/type";
import { key } from "@/store";
export default () => {
  const store = useStore(key);
  const detection = () => {
    if (document.body.clientWidth < 1025) {
      store.commit("app/changeDevice", device.move);
      store.commit("app/changeShow", false);
      store.state.app.isCollapse = false;
    } else {
      store.commit("app/changeDevice", device.desktop);
      store.commit("app/changeShow", true);
    }
  };
  onUnmounted(() => {
    window.removeEventListener("resize", detection);
  });
  onMounted(() => {
    detection();
    window.addEventListener("resize", detection);
  });
};
