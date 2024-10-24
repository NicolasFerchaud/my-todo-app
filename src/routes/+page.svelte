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
  let editingTask = null;

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
  }

  async function deleteTask(id) {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    tasks = await loadTasks();
  }

  async function updateTask(task) {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    editingTask = null; // Sortie du mode édition
    tasks = await loadTasks();
  }

  // Fonction pour marquer une tâche comme "accomplie"
  async function toggleComplete(task) {
    task.completed = !task.completed;
    await updateTask(task);
  }

  // Fonction pour entrer en mode édition
  function editTask(task) {
    editingTask = { ...task };
  }

  // Fonction pour annuler l'édition
  function cancelEdit() {
    editingTask = null;
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
      {#if editingTask && editingTask.id === task.id}
        <!-- Mode édition -->
        <div class="flex-1 mr-4">
          <input 
            bind:value={editingTask.title} 
            placeholder="Modifier le titre" 
            class="border border-gray-300 rounded-md p-2 mr-2 w-full" 
          />
          <input 
            bind:value={editingTask.description} 
            placeholder="Modifier la description" 
            class="border border-gray-300 rounded-md p-2 w-full" 
          />
        </div>
        <div class="flex space-x-2">
          <button 
            on:click={() => updateTask(editingTask)} 
            class="bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            Enregistrer
          </button>
          <button 
            on:click={cancelEdit} 
            class="bg-gray-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Annuler
          </button>
        </div>
      {:else}
        <!-- Affichage de la tâche -->
        <div class="flex-1 mr-4">
          <h2 class="text-xl font-semibold">{task.title}</h2>
          <p class="text-gray-600">{task.description}</p>
          <p class="text-sm">
            {task.completed ? "✅ Complétée" : "❌ Non complétée"}
          </p>
        </div>
        <div class="flex space-x-2">
          <button 
            on:click={() => toggleComplete(task)} 
            class={`font-semibold py-1 px-3 rounded-md transition duration-200 ${
              task.completed ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {task.completed ? "Marquer non complétée" : "Marquer complétée"}
          </button>
          <button 
            on:click={() => editTask(task)} 
            class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Modifier
          </button>
          <button 
            on:click={() => deleteTask(task.id)} 
            class="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
        </div>
      {/if}
    </li>
    {/each}
  </ul>
</div>