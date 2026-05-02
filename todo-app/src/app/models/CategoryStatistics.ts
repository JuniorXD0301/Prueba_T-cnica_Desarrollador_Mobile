export interface CategoryStatistics {
  categoryId: number | null;
  categoryName: string;
  completed: number;
  uncompleted: number;
  total: number;
  completionPercent: number;
}