<template>
  <article :class="['todo', { '--done': todo.completed, '--fav': todo.fav }]">
    {{ todo.userId }}
    <h6 class="todo__title">
      {{ todo.title }}
    </h6>
    <div class="todo__controls">
      <span class="todo__done">
        <svg
          v-if="todo.completed"
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 96 960 960"
          width="16"
          fill="#fff"
        >
          <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" />
        </svg>
      </span>
      <button class="todo__favorite" @click="favTodo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 96 960 960"
          width="16"
          fill="#fff"
        >
          <path
            d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z"
          />
        </svg>
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: "ToDoCard",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    favTodo() {
      this.$emit("favTodo", this.todo.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #a5a5a5;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  &__title {
    font-size: 18px;
    margin: 0;
  }
  &.--done {
    background: #519945;
    color: #fff;
  }
  &.--fav {
    border: 1px solid gold;
    .todo__favorite svg {
      fill: red;
    }
  }
  &__favorite {
    padding: 0;
    box-sizing: border-box;
    border: none;
    background: none;
    cursor: pointer;
  }
  &__controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  svg {
    pointer-events: none;
  }
}
</style>
