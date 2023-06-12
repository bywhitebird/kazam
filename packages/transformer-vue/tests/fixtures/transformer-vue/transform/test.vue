<script lang="ts">
import { Fragment, type PropType, createVNode, defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: undefined as unknown as PropType<string>,
      skipCheck: true,
      default: 'red',
    },
    size: {
      type: undefined as unknown as PropType<number>,
      skipCheck: true,
    },
  },
  setup(props) {
    return (({ color, size }) =>
      () => createVNode(Fragment, null, [color.value, size.value])
    )(toRefs(props))
  },
})
</script>
