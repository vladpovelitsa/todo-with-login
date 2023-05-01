<template>
  <main class="center todo-view">
    <aside class="todo-view__sidebar">
      <user-card :user="user" v-if="user" />
      <app-form @submit-form="addToDo">
        <template v-slot:form-title>New task</template>
        <template v-slot:form-fields>
          <app-input
            v-model="newToDo.userId.value"
            :error="newToDo.userId.error"
            type="number"
          />
          <app-input
            v-model="newToDo.title.value"
            :error="newToDo.title.error"
          />
        </template>
        <template v-slot:form-buttons>
          <app-button>
            <template v-slot:default> + Add</template>
          </app-button>
        </template>
      </app-form>
    </aside>
    <section class="todo-view__content">
      <section class="todo-view__filters">
        <select v-model="statusFilter">
          <option value="" selected disabled>Filter by status</option>
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Uncompleted</option>
          <option value="fav">Favorites</option>
        </select>
        <select v-model="userFilter">
          <option value="" selected disabled>Filter by user id</option>
          <option value="">All</option>
          <option :value="id" v-for="id in optionsForFilterByUser" :key="id">
            {{ id }}
          </option>
        </select>
      </section>
      <section>
        <app-input v-model="search" placeholder="Search task" type="search" />
      </section>
      <section class="todo-view__list" v-if="filtredTodos.length">
        <to-do-card
          v-for="todo in filtredTodos"
          :key="todo.fav ? 'fav-' + todo.id : todo.id"
          :todo="todo"
          @favTodo="setFavTodo"
          :favorite="todo.fav"
        />
      </section>
    </section>
  </main>
</template>

<script>
import UserCard from "@/components/card/UserCard.vue";
import AppForm from "@/components/form/AppForm.vue";
import AppInput from "@/components/form/AppInput.vue";
import AppButton from "@/components/form/AppButton.vue";
import CheckField from "@/mixins/checkField";
import ToDoCard from "@/components/card/ToDoCard.vue";

export default {
  name: "ToDoView",
  components: { ToDoCard, AppButton, AppInput, AppForm, UserCard },
  data() {
    return {
      user: null,
      todos: [],
      newToDo: {
        userId: {
          value: "",
          error: "",
        },
        title: {
          value: "",
          error: "",
        },
      },
      search: "",
      statusFilter: "",
      userFilter: "",
      filtredTodos: [],
      optionsForFilterByUser: "",
    };
  },
  async created() {
    this.user = await fetch(
      `https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`
    ).then((userData) => userData.json());
    this.todos = await fetch("https://jsonplaceholder.typicode.com/todos").then(
      (todosData) => todosData.json()
    );

    let favs = JSON.parse(localStorage.getItem("favoriteTodos"));
    favs.forEach((item) => {
      this.todos.find((todo) => todo.id === item).fav = true;
    });
    this.filterTodos();

    this.checkUserIdOptions();
  },
  methods: {
    async addToDo() {
      CheckField.check(this.newToDo.userId, () => true);
      CheckField.check(this.newToDo.title, () => true);
      if (!this.newToDo.userId.error && !this.newToDo.title.error) {
        await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            title: this.newToDo.title.value,
            userId: this.newToDo.userId.value,
            completed: false,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => this.todos.push(json));

        this.newToDo.userId.value = "";
        this.newToDo.title.value = "";
        this.filterTodos();
        this.checkUserIdOptions();
      }
    },
    setFavTodo(id) {
      let item = this.todos.find((item) => item.id === id);
      let favs = JSON.parse(localStorage.getItem("favoriteTodos"));
      let indexInFavs = favs.findIndex((item) => item === id);
      if (indexInFavs >= 0) {
        favs.splice(indexInFavs, 1);
      } else {
        favs.push(id);
      }
      localStorage.setItem("favoriteTodos", JSON.stringify(favs));
      item.fav = !item.fav;

      this.filterTodos();
    },
    filterTodos() {
      this.filtredTodos = [...this.todos];
    },
    filterBySearch() {
      this.filtredTodos = this.todos.filter((item) =>
        item.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filterByStatus() {
      this.filtredTodos = this.todos.filter((item) => {
        if (this.statusFilter === "true") {
          return item.completed;
        } else if (this.statusFilter === "false") {
          return !item.completed;
        } else if (this.statusFilter === "fav") {
          return item.fav;
        } else {
          return item;
        }
      });
    },
    checkUserIdOptions() {
      this.optionsForFilterByUser = new Set(
        this.todos.map((todo) => todo.userId)
      );
    },
  },
  watch: {
    search: function () {
      if (this.search) {
        this.filterBySearch();
      }
    },
    statusFilter: function () {
      if (this.statusFilter) {
        this.filterByStatus();
      }
    },
    userFilter: async function () {
      if (this.userFilter) {
        this.todos = await fetch(
          `https://jsonplaceholder.typicode.com/user/${this.userFilter}/todos`
        ).then((todosData) => todosData.json());
      } else {
        this.todos = await fetch(
          `https://jsonplaceholder.typicode.com/todos`
        ).then((todosData) => todosData.json());
      }
      this.filterTodos();
      if (this.statusFilter) {
        this.filterByStatus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-view {
  padding-top: 25px;
  padding-bottom: 25px;
  display: grid;
  align-items: start;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  section {
    grid-column: 2 / 3;
  }
  &__list,
  &__content,
  &__sidebar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__sidebar {
    position: sticky;
    top: 10px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    section {
      grid-column: unset;
    }
    &__sidebar {
      position: static;
    }
  }
}
</style>
