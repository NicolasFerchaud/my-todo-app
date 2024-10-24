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

<h1>Tâches</h1>

<input bind:value={newTask.title} placeholder="Titre" />
<input bind:value={newTask.description} placeholder="Description" />
<button on:click={createTask}>Créer une tâche</button>

<ul>
  {#each tasks as task}
    <li>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button on:click={() => deleteTask(task.id)}>Supprimer</button>
    </li>
  {/each}
</ul>
