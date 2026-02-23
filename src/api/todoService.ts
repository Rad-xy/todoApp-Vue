const BASE_URL = "https://699c5588110b5b738cc26517.mockapi.io";

export const todoService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) throw new Error("Ошибка при загрузке");
    return await res.json();
  },

  async create(text: string) {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, status: "active", isImportant: false }),
    });
    return await res.json();
  },

  async delete(id: string) {
    await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
  },

  async update(id: string, updates: object) {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return await res.json();
  },
};
