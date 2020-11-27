<template>
  <div>
    <v-col cols="5">
      <v-text-field
        label="book"
        single-line
        outlined
        type="text"
        class="todo-input"
        v-model="newTodo"
        @keyup.enter="addTodo"
      ></v-text-field>
    
    
      
      
     
    </v-col>
    <input
      type="text"
      class="todo-input"
      placeholder="book"
      v-model="newTodo"
      
    />
    <!-- <div><input v-model="form.name"></div> -->
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      {{ todo.title }}
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-input",
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      todos: [
        {
          id: 1,
          title: "ภาษาไทย",
          completed: false,
        },
        {
          id: 2,
          title: "คณิตศาสตร์",
          completed: false,
        },
      ],
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
      this.idForTodo++;
    },
props: ['form']

  },
};
</script>

<style scoped lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
</style>
