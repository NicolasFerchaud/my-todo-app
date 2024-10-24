import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }) {
	try {
		const data = await request.json();

		const task = await prisma.task.create({
			data: {
				title: data.title,
				description: data.description
			}
		});

		return new Response(JSON.stringify(task), { status: 201 });
	} catch (error) {
		console.error('Erreur lors de la création de la tâche:', error);
		return new Response('Erreur interne du serveur', { status: 500 });
	}
}

export async function GET() {
	try {
		const tasks = await prisma.task.findMany();
		return new Response(JSON.stringify(tasks), { status: 200 });
	} catch (error) {
		console.error('Erreur lors de la récupération des tâches:', error);
		return new Response('Erreur interne du serveur', { status: 500 });
	}
}

export async function PUT({ request }) {
	try {
		const data = await request.json();

		const task = await prisma.task.update({
			where: { id: data.id },
			data: {
				title: data.title,
				description: data.description,
				completed: data.completed
			}
		});

		return new Response(JSON.stringify(task), { status: 200 });
	} catch (error) {
		console.error('Erreur lors de la mise à jour de la tâche:', error);
		return new Response('Erreur interne du serveur', { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { id } = await request.json();

		await prisma.task.delete({
			where: { id }
		});

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Erreur lors de la suppression de la tâche:', error);
		return new Response('Erreur interne du serveur', { status: 500 });
	}
}
