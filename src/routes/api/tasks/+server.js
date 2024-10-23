import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const data = await request.json();

	const task = await prisma.task.create({
		data: {
			title: data.title,
			description: data.description
		}
	});

	return new Response(JSON.stringify(task), { status: 201 });
}

export async function GET() {
	const tasks = await prisma.task.findMany();
	return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function PUT({ request }) {
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
}

export async function DELETE({ request }) {
	const { id } = await request.json();

	await prisma.task.delete({
		where: { id }
	});

	return new Response(null, { status: 204 });
}
