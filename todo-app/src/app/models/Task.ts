export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    categoryId: number | null;
    createdAt: string;
    updatedAt: string;
}
