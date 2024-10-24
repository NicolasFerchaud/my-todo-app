<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();

    return {
      props: {
        tasks
      }
    };
  }
</script>

<script>
  export let tasks = [];
  let newTask = { title: '', description: '' };

  async function loadTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    return tasks;
  }

  async function createTask() {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    newTask = { title: '', description: '' };
    tasks = await loadTasks();
    // loadTasks(); // Appelez loadTasks ici si vous voulez recharger les tâches après la création.
  }

  async function deleteTask(id) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    tasks = await loadTasks();
    // loadTasks(); // Recharger les tâches après la suppression.
  }
</script>

<div class="mx-2">
  <h1 class="text-3xl font-bold mb-6">Tâches</h1>

  <div class="mb-4">
    <input 
      bind:value={newTask.title} 
      placeholder="Titre" 
      class="border border-gray-300 rounded-md p-2 mr-2 w-1/3" 
    />
    <input 
      bind:value={newTask.description} 
      placeholder="Description" 
      class="border border-gray-300 rounded-md p-2 mr-2 w-1/3" 
    />
    <button 
      on:click={createTask} 
      class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
    >
      Créer une tâche
    </button>
  </div>

  <ul class="space-y-4">
    {#each tasks as task}
      <li class="border border-gray-200 rounded-md p-4 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">{task.title}</h2>
          <p class="text-gray-600">{task.description}</p>
        </div>
        <button 
          on:click={() => deleteTask(task.id)} 
          class="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
        >
          Supprimer
        </button>
      </li>
    {/each}
  </ul>
</div>